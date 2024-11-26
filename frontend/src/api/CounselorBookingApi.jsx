import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/counselor-booking';

export const fetchAvailability = async (counselorId) => {
    const response = await axios.get(`${BASE_URL}/get_availability/${counselorId}`);
    return response.data.available_slots;
};

export const setAvailability = async (counselorId, date, startTime, endTime) => {
    const response = await axios.post(`${BASE_URL}/set_availability`, {
        counselor_id: counselorId,
        date,
        start_time: startTime,
        end_time: endTime
    });
    return response.data;
};

export const fetchBookingsForApproval = async (counselorId) => {
    const response = await axios.get(`${BASE_URL}/get_bookings_for_approval/${counselorId}`);
    return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    const response = await axios.post(`${BASE_URL}/update_booking_status`, {
        booking_id: bookingId,
        status
    });
    return response.data;
};

export const fetchBookingsForStarting = async (counselorId) => {
    const response = await axios.get(`${BASE_URL}/get_bookings_for_starting/${counselorId}`);
    return response.data;
};

