from flask import Blueprint, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler


load_dotenv()

events_bp = Blueprint('events', __name__)
CORS(events_bp, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]}})


# Database connection
DB_URL = os.getenv('DATABASE_URL')
conn = psycopg2.connect(DB_URL)

# ----------------------------------------------------------------------------------------------------------------
def update_event_with_web_link(event_id, web_link):
    try:
        # Assuming you already have a connection to the database (conn)
        cursor = conn.cursor()

        # SQL query to update the event with the web_link
        update_query = """
            UPDATE events
            SET link = %s
            WHERE id = %s;
        """
        
        # Execute the update query
        cursor.execute(update_query, (web_link, event_id))

        # Commit the changes to the database
        conn.commit()

        # Check if any rows were updated
        if cursor.rowcount > 0:
            print(f"Event {event_id} updated successfully with webLink.")
        else:
            print(f"No event found with ID {event_id}.")

        # Close the cursor after the update
        cursor.close()

    except Exception as e:
        print(f"Error updating event {event_id} with webLink: {str(e)}")

# ------------------------------------------------------------------------------------------------------------------

# SMTP Email Configuration
SMTP_SERVER = 'smtp.gmail.com'  # Replace with your SMTP server
SMTP_PORT = 587  # Common port for TLS
SMTP_USERNAME = os.getenv('SMTP_USERNAME')  # Replace with your email
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')  # Replace with your email password

def send_email(to_email, subject, body):
    """Send email notification."""
    try:
        # Set up the email
        message = MIMEMultipart()
        message['From'] = SMTP_USERNAME
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, to_email, message.as_string())
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {str(e)}")


# ----------------------------------------------------------------------------------------------------------------

# Initialize BERT model
bert_model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(text):
    """Generate BERT embeddings for the given text."""
    return bert_model.encode(text)

def recommend_counselors_mentors(event_description):
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Fetch counselor and mentor data
            cursor.execute("""
                                SELECT cp.user_id, cp.career_specialization, u.name AS counselor_name, cpi.location
                                FROM counselor_professional cp
                                JOIN users u ON cp.user_id = u.id
                                JOIN counselor_personal_info cpi ON cp.user_id = cpi.user_id;
            """)      
            counselors_data = pd.DataFrame(cursor.fetchall())

            cursor.execute("""
                            SELECT m.user_id, m.expertise, m.location, u.name AS mentor_name
                            FROM mentors m
                            JOIN users u ON m.user_id = u.id;
            """)
            mentors_data = pd.DataFrame(cursor.fetchall())

        # Preprocess and clean data
        counselors_data['career_specialization'] = counselors_data['career_specialization'].apply(
            lambda x: " ".join(x) if isinstance(x, list) else str(x)
        )
        counselors_data = counselors_data.dropna(subset=['career_specialization']).reset_index(drop=True)
        counselors_data['embedding'] = counselors_data['career_specialization'].apply(embed_text)

        mentors_data['expertise'] = mentors_data['expertise'].apply(
            lambda x: " ".join(x) if isinstance(x, list) else str(x)
        )
        mentors_data = mentors_data.dropna(subset=['expertise']).reset_index(drop=True)
        mentors_data['embedding'] = mentors_data['expertise'].apply(embed_text)

        # Embed event description
        event_embedding = embed_text(event_description)

        # Compute cosine similarity for counselors
        counselor_embeddings = np.vstack(counselors_data['embedding'].to_numpy())
        counselor_similarity = cosine_similarity(counselor_embeddings, [event_embedding]).flatten()
        counselors_data['similarity'] = counselor_similarity

        # Compute cosine similarity for mentors
        mentor_embeddings = np.vstack(mentors_data['embedding'].to_numpy())
        mentor_similarity = cosine_similarity(mentor_embeddings, [event_embedding]).flatten()
        mentors_data['similarity'] = mentor_similarity

        # Get top recommendations and convert results
        counselor_recommendations = counselors_data.nlargest(3, 'similarity')
        mentor_recommendations = mentors_data.nlargest(3, 'similarity')

        # Drop the embedding column to exclude from API response
        counselor_recommendations = counselor_recommendations.drop(columns=['embedding'])
        mentor_recommendations = mentor_recommendations.drop(columns=['embedding'])

        counselor_recommendations['similarity'] = counselor_recommendations['similarity'].astype(float)
        mentor_recommendations['similarity'] = mentor_recommendations['similarity'].astype(float)

        recommendations = {
            "counselors": counselor_recommendations.to_dict(orient='records'),
            "mentors": mentor_recommendations.to_dict(orient='records')
        }

        return recommendations

    except Exception as e:
        print(f"Error details: {str(e)}")
        return {"error": f"Failed to recommend counselors/mentors: {str(e)}"}

def recommend_institutes(city, state):
    """
    Recommend institutes based on the event location. First, try matching the city.
    If no city matches, fallback to matching institutes based on the state.
    If no matches are found, recommend all institutes or any three random institutes.
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # First, attempt to find institutes based on the city
            cursor.execute(
                "SELECT user_id, name, city, state, student_body FROM institute_info WHERE city = %s",
                (city,)
            )
            institutes = pd.DataFrame(cursor.fetchall())

            # If no institutes found in the city, attempt to find institutes by state
            if institutes.empty:
                cursor.execute(
                    "SELECT user_id, name, city, state, student_body FROM institute_info WHERE state = %s",
                    (state,)
                )
                institutes = pd.DataFrame(cursor.fetchall())

            # If still no institutes found, fallback to recommending all institutes or any 3
            if institutes.empty:
                cursor.execute("SELECT user_id, name, city, state, student_body FROM institute_info")
                all_institutes = pd.DataFrame(cursor.fetchall())
                
                # If no institutes exist in the database, return an error
                if all_institutes.empty:
                    return {"error": "No institutes found in the database."}
                
                # Recommend any three random institutes if there are more than three
                if len(all_institutes) > 3:
                    institutes = all_institutes.sample(n=3)
                else:
                    institutes = all_institutes

        # Return the results
        return institutes.to_dict(orient='records')

    except Exception as e:
        return {"error": f"Failed to recommend institutes: {str(e)}"}

# ---------------------------------------------------------------------------------------------------------------

@events_bp.route('/create_event', methods=['POST'])
def create_event():
    data = request.json

    # Extract fields from the request body
    name = data.get("name")
    image = data.get("image")  # Extract image URL
    description = data.get("description")
    event_type = data.get("event_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    duration = data.get("duration")
    capacity = data.get("capacity")
    link = data.get("link")
    event_mode = data.get("event_mode")
    city = data.get("city")
    state = data.get("state")
    organizer_id = data.get("organizer_id")

    # Validate required fields
    if not name or not event_type or not start_date or not event_mode:
        return jsonify({"error": "Missing required fields"}), 400

    # SQL query to insert the event
    insert_query = """
        INSERT INTO events (name, image, description, event_type, start_date, end_date, duration, capacity, link, event_mode, city, state, organizer_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
    """
    # SQL query to fetch the event details
    fetch_query = "SELECT * FROM events WHERE id = %s;"

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Insert the event and get its ID
            cursor.execute(insert_query, (name, image, description, event_type, start_date, end_date, duration, capacity, link, event_mode, city, state, organizer_id))
            event_id = cursor.fetchone()["id"]

            # Fetch the complete event details
            cursor.execute(fetch_query, (event_id,))
            event_details = cursor.fetchone()

        conn.commit()

        # Step 2: Recommend counselors/mentors or institutes based on event mode
        recommendations = {"counselors_and_mentors": [], "institutes": []}
        
        if event_mode == 'online':
            recommendations["counselors_and_mentors"] = recommend_counselors_mentors(description)
        elif event_mode == 'offline':
            recommendations["counselors_and_mentors"] = recommend_counselors_mentors(description)
            recommendations["institutes"] = recommend_institutes(city, state)
        elif event_mode == 'hybrid':
            recommendations["counselors_and_mentors"] = recommend_counselors_mentors(description)
            recommendations["institutes"] = recommend_institutes(city, state)

        # Return the event details along with recommendations
        return jsonify({
            "message": "Event created successfully",
            "event": event_details,
            "recommendations": recommendations
        }), 201

    except Exception as e:
        conn.rollback()
        print(f"Error: {e}")
        return jsonify({"error": "Failed to create event", "details": str(e)}), 500

# ---------------------------------------------------------------------------------------------------------------------------------------------------------

@events_bp.route('/send_request', methods=['POST'])
def send_request():
    data = request.json
    event_id = data.get("event_id")
    user_id = data.get("user_id")  # New user or original user
    role = data.get("role")  # Role (counselor, mentor, speaker)

    if not event_id or not user_id or not role:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor() as cursor:
            # Validate the user for the given role
            if role == "counselor":
                cursor.execute("SELECT user_id FROM counselor_professional WHERE user_id = %s", (user_id,))
                if cursor.fetchone() is None:
                    return jsonify({"error": "Invalid counselor user ID"}), 400
            
            if role == "mentor":
                cursor.execute("SELECT user_id FROM mentors WHERE user_id = %s", (user_id,))
                if cursor.fetchone() is None:
                    return jsonify({"error": "Invalid mentor user ID"}), 400
            
            # Check for a soft-deleted request with the same event_id, role, and user_id
            cursor.execute("""
                SELECT id FROM event_requests 
                WHERE event_id = %s AND role = %s AND user_id = %s AND is_active = FALSE
            """, (event_id, role, user_id))
            existing_request = cursor.fetchone()

            if existing_request:
                # Reactivate the soft-deleted request for the same user
                cursor.execute("""
                    UPDATE event_requests 
                    SET status = 'pending', is_active = TRUE 
                    WHERE id = %s
                """, (existing_request[0],))
                conn.commit()
                return jsonify({
                    "message": "Request reactivated successfully.",
                    "request_id": existing_request[0]
                }), 200

            # If no matching soft-deleted request, create a new request
            query = """
                INSERT INTO event_requests (event_id, user_id, role, status, is_active)
                VALUES (%s, %s, %s, 'pending', TRUE) RETURNING id;
            """
            cursor.execute(query, (event_id, user_id, role))
            request_id = cursor.fetchone()[0]
            conn.commit()

            # Update the event status to 'pending'
            cursor.execute("UPDATE events SET status = 'pending' WHERE id = %s", (event_id,))
            conn.commit()

            return jsonify({
                "message": "Request created successfully.",
                "request_id": request_id
            }), 201

    except Exception as e:
        return jsonify({"error": f"Failed to send/reassign request: {str(e)}"}), 500

    
# ---------------------------------------------------------------------------------------------------------------------------------------------------------
#Requests are accepted or rejected and event status is changed acoordingly
@events_bp.route('/update_request_status', methods=['POST'])
def update_request_status():
    data = request.json
    request_id = data.get("request_id")
    new_status = data.get("status")  # New status (Accepted, Rejected)

    if not request_id or not new_status:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Check if the request exists
            cursor.execute("SELECT id, event_id, user_id FROM event_requests WHERE id = %s", (request_id,))
            event_request = cursor.fetchone()
            if not event_request:
                return jsonify({"error": "Request not found"}), 404

            # Check if the status is valid
            if new_status not in ['accepted', 'rejected']:
                return jsonify({"error": "Invalid status"}), 400

            # If rejected, perform soft delete
            if new_status == 'rejected':
                query = """
                    UPDATE event_requests 
                    SET status = 'rejected', is_active = FALSE 
                    WHERE id = %s
                """
                cursor.execute(query, (request_id,))
                conn.commit()

                # Update the event status to 'on hold'
                event_id = event_request['event_id']
                print(f"Request {request_id} rejected. Setting event {event_id} status to 'on hold'.")
                cursor.execute("UPDATE events SET status = 'on hold' WHERE id = %s", (event_id,))
                conn.commit()

                return jsonify({"message": f"Request {new_status} successfully"}), 200

            # If accepted, update the status
            query = """
                UPDATE event_requests 
                SET status = 'accepted' 
                WHERE id = %s
            """
            cursor.execute(query, (request_id,))
            conn.commit()

            # Get user_id from event_requests table and fetch their email
            user_id = event_request['user_id']
            cursor.execute("SELECT email FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()

            if not user:
                return jsonify({"error": "User not found"}), 404

            user_email = user['email']
            subject = "You are now part of the event!"
            body = f"Congratulations! You have been successfully accepted as part of the event. We look forward to your participation."

            # Send an email to the user
            send_email(user_email, subject, body)

            # Check if all active requests for the event are accepted
            event_id = event_request['event_id']
            cursor.execute("""
                SELECT COUNT(*) AS accepted_count 
                FROM event_requests 
                WHERE event_id = %s AND is_active = TRUE AND status = 'accepted'
            """, (event_id,))
            accepted_count = cursor.fetchone()['accepted_count']

            cursor.execute("""
                SELECT COUNT(*) AS total_active_requests 
                FROM event_requests 
                WHERE event_id = %s AND is_active = TRUE
            """, (event_id,))
            total_active_requests = cursor.fetchone()['total_active_requests']

            print(f"Accepted count: {accepted_count}, Total active requests: {total_active_requests}")

            if accepted_count == total_active_requests and total_active_requests > 0:
                print(f"All active requests accepted for event {event_id}. Updating event status to 'scheduled'.")
                cursor.execute("UPDATE events SET status = 'scheduled' WHERE id = %s", (event_id,))
                conn.commit()

                # Check if the event is online
                cursor.execute("SELECT name, description, start_date, duration, event_mode FROM events WHERE id = %s", (event_id,))
                event = cursor.fetchone()

                if event['event_mode'].lower() in ['online', 'hybrid']:
                    print(f"Event {event_id} is {event['event_mode'].lower()}. Creating Webex meeting...")
                    meeting_payload = {
                        "user_id": 12,
                        "title": event['name'],
                        "start": event['start_date'].isoformat(),
                        "duration": int(event['duration'] * 60),  # Convert hours to minutes
                        "agenda": event['description']
                    }
                    print(meeting_payload)

                    response = requests.post(
                        "http://localhost:4000/api/meeting/create",
                        json=meeting_payload
                    )

                    if response.status_code == 200:
                        print(f"Webex meeting created successfully for event {event_id}.")
                        # Extract the webLink from the Webex meeting response
                        web_link = response.json().get('meeting', {}).get('webLink')
                        
                        if web_link:
                            # Now update the event with the webLink in the database
                            update_event_with_web_link(event_id, web_link)
                        else:
                            print(f"Webex meeting created, but no webLink found for event {event_id}.")
                    else:
                        print(f"Failed to create Webex meeting: {response.json()}")

            return jsonify({"message": f"Request {new_status} successfully"}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": f"Failed to update request status: {str(e)}"}), 500

# ----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                # STUDENT REGISTRATION AREA #

@events_bp.route('/register_for_event', methods=['POST'])
def register_for_event():
    data = request.json
    event_id = data.get("event_id")
    student_id = data.get("student_id")

    if not event_id or not student_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Validate event ID
            cursor.execute("SELECT id, capacity FROM events WHERE id = %s", (event_id,))
            event = cursor.fetchone()
            if not event:
                return jsonify({"error": "Event not found"}), 404

            # Check if event capacity is reached
            cursor.execute("""
                SELECT COUNT(*) AS registrations 
                FROM event_registrations 
                WHERE event_id = %s AND status = 'confirmed'
            """, (event_id,))
            registration_count = cursor.fetchone()["registrations"]
            if registration_count >= event["capacity"]:
                return jsonify({"error": "Event capacity reached"}), 400

            # Check existing registration
            cursor.execute("""
                SELECT id, status 
                FROM event_registrations 
                WHERE event_id = %s AND student_id = %s
            """, (event_id, student_id))
            existing_registration = cursor.fetchone()

            if existing_registration:
                if existing_registration["status"] == "cancelled":
                    # Reactivate cancelled registration
                    cursor.execute("""
                        UPDATE event_registrations 
                        SET status = 'pending', updated_at = CURRENT_TIMESTAMP 
                        WHERE id = %s
                    """, (existing_registration["id"],))
                    conn.commit()
                    return jsonify({"message": "Registration updated successfully", 
                                    "registration_id": existing_registration["id"]}), 200

                return jsonify({"error": "Student is already registered for this event"}), 400

            # Create a new registration
            cursor.execute("""
                INSERT INTO event_registrations (event_id, student_id, status) 
                VALUES (%s, %s, 'pending') RETURNING id
            """, (event_id, student_id))
            registration_id = cursor.fetchone()["id"]
            conn.commit()

            return jsonify({"message": "Registration successful", "registration_id": registration_id}), 201

    except Exception as e:
        # Rollback the transaction on error
        conn.rollback()
        return jsonify({"error": f"Failed to register for event: {str(e)}"}), 500


@events_bp.route('/get_event_registrations', methods=['GET'])
def get_event_registrations():
    """Endpoint to retrieve all students registered for a specific event."""
    event_id = request.args.get("event_id")

    if not event_id:
        return jsonify({"error": "Event ID is required"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Fetch registrations for the event
            query = """
                SELECT er.id AS registration_id, er.status, er.created_at, er.updated_at, 
                       u.id AS student_id, u.name AS student_name, u.email AS student_email
                FROM event_registrations er
                JOIN users u ON er.student_id = u.id
                WHERE er.event_id = %s
            """
            cursor.execute(query, (event_id,))
            registrations = cursor.fetchall()

            return jsonify({
                "event_id": event_id,
                "registrations": registrations
            }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch event registrations: {str(e)}"}), 500


@events_bp.route('/update_registration_status', methods=['POST'])
def update_registration_status():
    """Endpoint for admins to update registration status."""
    data = request.json
    registration_id = data.get("registration_id")
    new_status = data.get("status")  # New status: 'confirmed', 'cancelled'

    if not registration_id or not new_status:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor() as cursor:
            # Validate the status
            if new_status not in ['pending', 'confirmed', 'cancelled']:
                return jsonify({"error": "Invalid status"}), 400

            # Get the event ID and student email associated with the registration
            cursor.execute("""
                SELECT er.event_id, u.email, e.name AS event_name 
                FROM event_registrations er
                JOIN users u ON er.student_id = u.id
                JOIN events e ON er.event_id = e.id
                WHERE er.id = %s
            """, (registration_id,))
            registration_data = cursor.fetchone()
            
            if not registration_data:
                return jsonify({"error": "Registration ID not found"}), 404
            
            event_id, student_email, event_name = registration_data

            # Update the status of the requested registration
            query = """
                UPDATE event_registrations 
                SET status = %s, updated_at = CURRENT_TIMESTAMP 
                WHERE id = %s
            """
            cursor.execute(query, (new_status, registration_id))

            # Check current confirmed registrations and event capacity
            cursor.execute("""
                SELECT COUNT(*) AS confirmed_count, e.capacity 
                FROM event_registrations er
                JOIN events e ON er.event_id = e.id
                WHERE er.event_id = %s AND er.status = 'confirmed'
                GROUP BY e.capacity
            """, (event_id,))
            result = cursor.fetchone()
            
            if not result:
                return jsonify({"error": "Event not found"}), 404
            
            confirmed_count, capacity = result
            
            # If the new status is 'confirmed', check against capacity
            if new_status == 'confirmed':
                if confirmed_count >= capacity:
                    # If capacity is reached, cancel all pending registrations for this event
                    cursor.execute("""
                        UPDATE event_registrations 
                        SET status = 'cancelled' 
                        WHERE event_id = %s AND status = 'pending'
                    """, (event_id,))
                    conn.commit()
                    return jsonify({
                        "message": "Registration Confirmed, but pending registrations have been cancelled due to capacity limit."
                    }), 200

                # Send email to the student about their confirmation
                subject = "You're Invited to Attend the Event!"
                body = f"Dear Student,\n\nCongratulations! Your registration for the event '{event_name}' has been confirmed. We look forward to seeing you there.\n\nBest Regards,\nThe Event Team"
                print(f"Sending email to {student_email}...")
                send_email(student_email, subject, body)

            conn.commit()

            return jsonify({"message": "Registration status updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to update registration status: {str(e)}"}), 500

@events_bp.route('/cancel_registration', methods=['POST'])
def cancel_registration():
    """Endpoint for students to cancel their registration."""
    data = request.json
    event_id = data.get("event_id")
    student_id = data.get("student_id")

    if not event_id or not student_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor() as cursor:
            # Soft-delete or update the status to 'cancelled'
            query = """
                UPDATE event_registrations 
                SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
                WHERE event_id = %s AND student_id = %s AND status != 'cancelled'
            """
            cursor.execute(query, (event_id, student_id))
            rows_updated = cursor.rowcount
            conn.commit()

            if rows_updated == 0:
                return jsonify({"error": "No active registration found to cancel"}), 404

            return jsonify({"message": "Registration cancelled successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to cancel registration: {str(e)}"}), 500

# -------------------------------------------------------------------------------------------------------------------

@events_bp.route('/go_live', methods=['POST'])
def go_live():
    """Go live for an event: Updates the status and notifies participants."""
    data = request.json
    event_id = data.get("event_id")

    if not event_id:
        return jsonify({"error": "Missing event_id"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Check if the event exists and is ready to go live
            cursor.execute("SELECT * FROM events WHERE id = %s AND status = 'scheduled'", (event_id,))
            event = cursor.fetchone()

            if not event:
                return jsonify({"error": "Event not found or not in 'scheduled' state"}), 404

            # Update event status to 'live'
            cursor.execute("UPDATE events SET status = 'live' WHERE id = %s", (event_id,))
            conn.commit()
            print(f"Event {event_id} is now live.")

            # Insert participants into `event_attendance`
            # Fetch all accepted registrations and requests
            cursor.execute("""
                SELECT student_id AS user_id FROM event_registrations
                WHERE event_id = %s AND status = 'confirmed'
                UNION
                SELECT user_id FROM event_requests
                WHERE event_id = %s AND status = 'accepted'
            """, (event_id, event_id))
            participants = cursor.fetchall()
            print("Done")

            # Bulk insert attendance records
            for participant in participants:
                user_id = participant.get('student_id') or participant.get('user_id')

                # Insert attendance record
                cursor.execute("""
                    INSERT INTO event_attendance (event_id, user_id, attendance_status)
                    VALUES (%s, %s, FALSE) 
                    ON CONFLICT (event_id, user_id) DO NOTHING;
                """, (event_id, user_id))
            conn.commit()

            # Send emails to participants
            for participant in participants:
                user_id = participant.get('student_id') or participant.get('user_id')
                cursor.execute("SELECT email FROM users WHERE id = %s", (user_id,))
                email = cursor.fetchone()['email']
                print ("Mail Fetched")

                # Email content
                subject = f"Event {event['name']} is now live!"
                body = (
                    f"Hello,\n\n"
                    f"The event '{event['name']}' is now live! Join us using the following link:\n"
                    f"{event['link']}\n\n"
                    f"Thank you for being a part of our event.\n\n"
                    f"Best regards,\nEvent Team"
                )
                try:
                    send_email(email, subject, body)
                    print(f"Email sent to {email}")
                except Exception as e:
                    print(f"Failed to send email to {email}: {str(e)}")

        return jsonify({"message": f"Event {event_id} is now live, and participants have been notified."}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": f"Failed to go live for the event: {str(e)}"}), 500


@events_bp.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    """Mark a participant's attendance for an event."""
    data = request.json
    event_id = data.get("event_id")
    user_id = data.get("user_id")

    if not event_id or not user_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Check if the user is registered for the event
            cursor.execute("""
                SELECT * FROM event_attendance 
                WHERE event_id = %s AND user_id = %s
            """, (event_id, user_id))
            attendance_record = cursor.fetchone()

            if not attendance_record:
                return jsonify({"error": "User not registered for this event"}), 404

            # Mark attendance as present
            cursor.execute("""
                UPDATE event_attendance
                SET attendance_status = TRUE, attendance_time = %s
                WHERE event_id = %s AND user_id = %s
            """, (datetime.now(), event_id, user_id))
            conn.commit()

        return jsonify({"message": "Attendance marked successfully"}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": f"Failed to mark attendance: {str(e)}"}), 500

@events_bp.route('/event_attendance', methods=['GET'])
def get_event_attendance():
    """Get the attendance record for an event."""
    event_id = request.args.get("event_id")

    if not event_id:
        return jsonify({"error": "Missing event_id"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute("""
                SELECT ea.user_id, u.name, ea.attendance_status, ea.attendance_time
                FROM event_attendance ea
                JOIN users u ON ea.user_id = u.id
                WHERE ea.event_id = %s
            """, (event_id,))
            attendance_records = cursor.fetchall()

        return jsonify({"attendance_records": attendance_records}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": f"Failed to fetch attendance records: {str(e)}"}), 500
