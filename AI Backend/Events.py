from flask import Flask, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5175", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"]}})

# Database connection
DATABASE_URL = "postgresql://postgres:devashish@localhost:5432/atisha_db"
conn = psycopg2.connect(DATABASE_URL)

# ------------------------------------------------------------------------------------------------------------------

# SMTP Email Configuration
SMTP_SERVER = 'smtp.gmail.com'  # Replace with your SMTP server
SMTP_PORT = 587  # Common port for TLS
SMTP_USERNAME = 'sih.atisha1@gmail.com'  # Replace with your email
SMTP_PASSWORD = 'gfue gsbu smlb mkkb'  # Replace with your email password

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



def recommend_institutes(city,state):
    """
    Recommend institutes based on the event location. First, try matching the city.
    If no city matches, fallback to matching institutes based on the state.
    """
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # First, attempt to find institutes based on the city
            cursor.execute("SELECT user_id, name, city, state, student_body FROM institute_info WHERE city = %s", (city,))
            institutes = pd.DataFrame(cursor.fetchall())

            # If no institutes found in the city, attempt to find institutes by state
            if institutes.empty:
                # Check if location is a city or state
                cursor.execute("SELECT user_id, name, city, state, student_body FROM institute_info WHERE state = %s", (state,))
                institutes = pd.DataFrame(cursor.fetchall())

                # If still no institutes found by state, check if location matches any known city/state pair
                if institutes.empty:
                    # Fallback to searching by both city and state if we have a state match
                    cursor.execute("SELECT user_id, name, city, state, student_body FROM institute_info WHERE state = %s OR city = %s", (city, state))
                    institutes = pd.DataFrame(cursor.fetchall())

        # Return the results or an error if no institutes found
        if institutes.empty:
            return {"error": "No institutes found for the provided location (city or state)."}
        
        # Return the institutes found, either by city or state
        return institutes.to_dict(orient='records')

    except Exception as e:
        return {"error": f"Failed to recommend institutes: {str(e)}"}


@app.route('/create_event', methods=['POST'])
def create_event():
    data = request.json
    name = data.get("name")
    description = data.get("description")
    event_type = data.get("event_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    duration = data.get("duration")
    capacity = data.get("capacity")
    link = data.get("link")
    event_mode = data.get("event_mode")
    city  = data.get("city")
    state = data.get("state")
    organizer_id = data.get("organizer_id")

    if not name or not event_type or not start_date or not event_mode or not organizer_id:
        return jsonify({"error": "Missing required fields"}), 400

    # Insert into events table
    query = """
        INSERT INTO events (name, description, event_type, start_date, end_date, duration, capacity, link, event_mode, city, state, organizer_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
    """
    with conn.cursor() as cursor:
        cursor.execute(query, (name, description, event_type, start_date, end_date, duration, capacity, link, event_mode, city, state, organizer_id))
        event_id = cursor.fetchone()[0]
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

    return jsonify({
        "message": "Event created successfully",
        "event_id": event_id,
        "recommendations": recommendations
    }), 201


# ---------------------------------------------------------------------------------------------------------------------------------------------------------

# @app.route('/send_request', methods=['POST'])
# def send_request():
#     data = request.json
#     event_id = data.get("event_id")
#     user_id = data.get("user_id")  # ID of the counselor/mentor/speaker
#     role = data.get("role")  # Role (counselor, mentor, speaker)
    
#     if not event_id or not user_id or not role:
#         return jsonify({"error": "Missing required fields"}), 400
    
#     try:
#         with conn.cursor() as cursor:
#             # Check if the user is a valid counselor, mentor, or speaker
#             cursor.execute("SELECT user_id FROM counselor_professional WHERE user_id = %s", (user_id,))
#             if role == "counselor" and cursor.fetchone() is None:
#                 return jsonify({"error": "Invalid counselor user ID"}), 400
            
#             cursor.execute("SELECT user_id FROM mentors WHERE user_id = %s", (user_id,))
#             if role == "mentor" and cursor.fetchone() is None:
#                 return jsonify({"error": "Invalid mentor user ID"}), 400
            
#             # cursor.execute("SELECT user_id FROM speakers WHERE user_id = %s", (user_id,))
#             # if role == "speaker" and cursor.fetchone() is None:
#             #     return jsonify({"error": "Invalid speaker user ID"}), 400
            
#             # Insert the request into the event_requests table
#             query = """
#                 INSERT INTO event_requests (event_id, user_id, role, status)
#                 VALUES (%s, %s, %s, 'pending') RETURNING id;
#             """
#             cursor.execute(query, (event_id, user_id, role))
#             request_id = cursor.fetchone()[0]
#             conn.commit()
            
#             # Return success response
#             return jsonify({"message": "Request sent successfully", "request_id": request_id}), 201

#     except Exception as e:
#         return jsonify({"error": f"Failed to send request: {str(e)}"}), 500

@app.route('/send_request', methods=['POST'])
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
@app.route('/update_request_status', methods=['POST'])
def update_request_status():
    data = request.json
    request_id = data.get("request_id")
    new_status = data.get("status")  # New status (Accepted, Rejected)

    if not request_id or not new_status:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Check if the request exists
            cursor.execute("SELECT id, event_id FROM event_requests WHERE id = %s", (request_id,))
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

            return jsonify({"message": f"Request {new_status} successfully"}), 200

    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"error": f"Failed to update request status: {str(e)}"}), 500

# ----------------------------------------------------------------------------------------------------------------------------------------------------------
                                                # STUDENT REGISTRATION AREA #

@app.route('/register_for_event', methods=['POST'])
def register_for_event():
    data = request.json
    event_id = data.get("event_id")
    student_id = data.get("student_id")

    if not event_id or not student_id:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Check event capacity
            cursor.execute("""
                SELECT capacity FROM events WHERE id = %s
            """, (event_id,))
            event = cursor.fetchone()

            if not event:
                return jsonify({"error": "Event not found"}), 404

            # Check current registrations
            cursor.execute("""
                SELECT COUNT(*) AS registrations FROM event_registrations WHERE event_id = %s AND status = 'confirmed'
            """, (event_id,))
            registration_count = cursor.fetchone()["registrations"]

            if registration_count >= event["capacity"]:
                return jsonify({"error": "Event capacity reached"}), 400

            # Check if a registration exists for this student and event
            cursor.execute("""
                SELECT id, status FROM event_registrations 
                WHERE event_id = %s AND student_id = %s
            """, (event_id, student_id))
            existing_registration = cursor.fetchone()

            if existing_registration:
                # If status is 'cancelled', update it to 'pending'
                if existing_registration["status"] == "cancelled":
                    cursor.execute("""
                        UPDATE event_registrations 
                        SET status = 'pending', updated_at = CURRENT_TIMESTAMP 
                        WHERE id = %s
                    """, (existing_registration["id"],))
                    conn.commit()
                    return jsonify({"message": "Registration updated successfully", "registration_id": existing_registration["id"]}), 200

                # Otherwise, the student is already registered
                return jsonify({"error": "Student is already registered for this event"}), 400

            # If no existing registration, create a new one
            cursor.execute("""
                INSERT INTO event_registrations (event_id, student_id, status)
                VALUES (%s, %s, 'pending') RETURNING id
            """, (event_id, student_id))
            registration_id = cursor.fetchone()["id"]
            conn.commit()

            return jsonify({"message": "Registration successful", "registration_id": registration_id}), 201

    except Exception as e:
        return jsonify({"error": f"Failed to register for event: {str(e)}"}), 500


@app.route('/get_event_registrations', methods=['GET'])
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


@app.route('/update_registration_status', methods=['POST'])
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

@app.route('/cancel_registration', methods=['POST'])
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


if __name__ == "__main__":
    app.run(debug=True, port=7000)
