import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/counselor-booking';

export const fetchAvailability = async (counselorId) => {
    const response = await axios.get(`${BASE_URL}/get_availability/${counselorId}`);
    return response.data.available_slots;
};

// export const setAvailability = async (counselorId, date, startTime, endTime) => {
//     // console.log({counselorId, date, startTime, endTime});
//     // const response = await axios.post(`${BASE_URL}/set_availability`, {
//     //     counselor_id: counselorId,
//     //     date,
//     //     start_time: startTime,
//     //     end_time: endTime
//     // });
//     // return response.data;
//
//     // Log the parameters for debugging
//     console.log({ counselorId, date, startTime, endTime });
//
//     // Prepare the request payload
//     const payload = {
//         counselor_id: counselorId,
//         date: date,
//         start_time: `${startTime}:00`,
//         end_time: `${endTime}:00`
//     };
//
//     try {
//         // Make the API request to set availability
//         const response = await axios.post(`${BASE_URL}/set_availability`, payload);
//         return response.data; // Return the response data
//     } catch (error) {
//         console.error('Error setting availability:', error);
//         throw error; // Rethrow the error for further handling if needed
//     }
// };


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
        const response = await axios.post(`${BASE_URL}/set_availability`, payload);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error setting availability:', error);
        throw error; // Rethrow the error for further handling if needed
    }
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

export async function fetchCounselorsData() {
    try {
        const response = await axios.get('http://localhost:4000/api/counselor');
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
        const session = await axios.get(`http://localhost:4000/api/counselor-booking/get_bookings_for_student/${stundent_id}`);
        console.log(session);
        return session.data
    }
    catch (error) {
        console.error("Error getting session:", error);
    }
};

