import axios from 'axios';
import apiBackend from '../utils/api'

const BASE_URL = 'http://localhost:4000/api/counselor-booking';

export const fetchAvailability = async (counselorId) => {
    const response = await apiBackend.get(`/counselor-booking/get_availability/${counselorId}`);
    return response.data.available_slots;
};


export const setAvailability = async (counselorId, date, startTime, endTime) => {
    // Log the parameters for debugging
    console.log({ counselorId, date, startTime, endTime });

    // Prepare the request payload with corrected time format
    const payload = {
        counselor_id: parseInt(counselorId),
        date: date,
        start_time: `${startTime}:00`, // Ensure seconds are included
        end_time: `${endTime}:00` // Ensure seconds are included
    };

    try {
        // Make the API request to set availability
        const response = await apiBackend.post(`/counselor-booking/set_availability`, payload);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error setting availability:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};




export const fetchBookingsForApproval = async (counselorId) => {
    const response = await apiBackend.get(`/counselor-booking/get_bookings_for_approval/${counselorId}`);
    return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    const response = await apiBackend.post(`${BASE_URL}/update_booking_status`, {
        booking_id: bookingId,
        status
    });
    return response.data;
};

export const fetchBookingsForStarting = async (counselorId) => {
    const response = await apiBackend.get(`/counselor-booking/get_bookings_for_starting/${counselorId}`);
    return response.data;
};

export async function fetchCounselorsData() {
    try {
        const response = await apiBackend.get('/counselor');
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("response:" ,response.data);
        return await response.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

export async function fetchSessionByStudentId (studentId) {
    const stundent_id = await studentId;

    try {
        const session = await apiBackend.get(   `/counselor-booking/get_bookings_for_student/${stundent_id}`);
        console.log(session);
        return session.data
    }
    catch (error) {
        console.error("Error getting session:", error);
    }
};


export async function fetchCounselorSlots(counselorId) {
    try {
        const response = await apiBackend.get(`/counselor-booking/get_availability/${counselorId}`);
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.data;
    } catch (error) {
        console.error("Error fetching counselor slots:", error);
        return null;
    }
}

export async function bookSlot(studentId, counselorAvailabilityId) {
    try {
        console.log({studentId, counselorAvailabilityId});
        const response = await apiBackend.post('/counselor-booking/book_slot',

            { student_id: studentId, counselor_availability_id: counselorAvailabilityId },
        );
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

export async function fetchStudentCounselorBookings(studentId) {
    try {
        const response = await apiBackend.get(`/counselor-booking/get_bookings_for_student/${studentId}`);
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






