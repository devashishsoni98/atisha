import axios from "axios";

export async function fetchCounselorsData() {
    try {
        const response = await axios.get('http://localhost:4000/api/counselor');
        if (!response) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching counselors data:", error);
        return null;
    }
}

export async function fetchCounselorSlots(counselorId) {
    try {
        const response = await fetch(`http://localhost:4000/api/counselor-booking/get_availability/${counselorId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching counselor slots:", error);
        return null;
    }
}

export async function bookSlot(studentId, counselorAvailabilityId) {
    try {
        console.log({studentId, counselorAvailabilityId});
        const response = await axios.post('http://localhost:4000/api/counselor-booking/book_slot',

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

export async function fetchStudentBookings(studentId) {
    try {
        const response = await axios.get(`http://localhost:4000/api/counselor-booking/get_bookings_for_student/${studentId}`);
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




