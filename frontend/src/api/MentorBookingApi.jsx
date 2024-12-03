
import apibackend from '../utils/api';

const BASE_URL = 'http://localhost:4000/api/mentor-booking';

export const fetchAvailability = async (mentorId) => {
    const response = await apibackend.get(`/mentor-booking/get_availability/${mentorId}`);
    return response.data.available_slots;
};

export const setAvailability = async (mentorId, date, startTime, endTime) => {
    // Log the parameters for debugging
    console.log({ mentorId, date, startTime, endTime });

    // Prepare the request payload with corrected time format
    const payload = {
        mentor_id: parseInt(mentorId),
        date: date,
        start_time: `${startTime}:00`, // Ensure seconds are included
        end_time: `${endTime}:00` // Ensure seconds are included
    };

    try {
        // Make the API request to set availability
        const response = await apibackend.post(`/mentor-booking/set_availability`, payload);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error setting availability:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const fetchBookingsForApproval = async (mentorId) => {
    const response = await apibackend.get(`/mentor-booking/get_bookings_for_approval/${mentorId}`);
    return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    const response = await apibackend.post(`/mentor-booking/update_booking_status`, {
        booking_id: bookingId,
        status
    });
    return response.data;
};

export const fetchBookingsForStarting = async (mentorId) => {
    const response = await apibackend.get(`/mentor-booking/get_bookings_for_starting/${mentorId}`);
    return response.data;
};

export async function fetchMentorsData() {
    try {
        const response = await apibackend.get('/mentor');
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("response:", response.data);
        return await response.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

export async function fetchSessionByStudentId(studentId) {
    const student_id = await studentId;

    try {
        const session = await apibackend.get(`/mentor-booking/get_bookings_for_student/${student_id}`);
        console.log(session);
        return session.data;
    } catch (error) {
        console.error("Error getting session:", error);
    }
};



export async function fetchMentorSlots(mentorId) {
    try {
        const response = await apibackend(`/mentor-booking/get_availability/${mentorId}`);
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.data;
    } catch (error) {
        console.error("Error fetching mentor slots:", error);
        return null;
    }
}

export async function bookSlot(studentId, mentorAvailabilityId) {
    try {
        console.log({ studentId, mentorAvailabilityId });
        const response = await apibackend.post('http://localhost:4000/api/mentor-booking/book_slot', {
            student_id: studentId,
            mentor_availability_id: mentorAvailabilityId
        });
        console.log(response.data);
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.data;
    } catch (error) {
        console.error("Error booking slot:", error);
        return null;
    }
}

export async function fetchStudentMentorBookings(studentId) {
    try {
        const response = await apibackend.get(`http://localhost:4000/api/mentor-booking/get_bookings_for_student/${studentId}`);
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.data);
        return await response.data;
    } catch (error) {
        console.error("Error fetching student bookings:", error);
        return null;
    }
}
