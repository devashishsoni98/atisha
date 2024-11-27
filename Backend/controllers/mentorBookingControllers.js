const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { addHours } = require('date-fns');

// Set Availability
const setMentorAvailability = async (req, res) => {
    const { mentor_id, date, start_time, end_time } = req.body;

    console.log(mentor_id, date, start_time, end_time);

    // Validate input
    if (!mentor_id || !date || !start_time || !end_time) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Construct full Date objects for start and end times
        const startTime = new Date(`${date}T${start_time}`);
        const endTime = new Date(`${date}T${end_time}`);

        // Check if the dates are valid
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return res.status(400).json({ error: "Invalid date or time format" });
        }

        if (startTime >= endTime) {
            return res.status(400).json({ error: "Start time must be earlier than end time" });
        }

        const intervals = [];
        let currentStart = startTime;

        while (currentStart < endTime) {
            let nextEnd = new Date(currentStart);
            nextEnd.setHours(currentStart.getHours() + 2); // Add 2 hours

            if (nextEnd > endTime) nextEnd = endTime;

            intervals.push({
                mentor_id: parseInt(mentor_id),
                date: new Date(date), // Store only the date part
                start_time: currentStart.toISOString(), // Store as ISO string
                end_time: nextEnd.toISOString() // Store as ISO string
            });

            currentStart = nextEnd;
        }

        console.log(intervals);
        await prisma.mentor_availability.createMany({ data: intervals });
        res.status(201).json({ message: "Availability added successfully", slots_added: intervals });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add availability", details: err.message });
    }
};

// Get Availability
const getMentorAvailability = async (req, res) => {
    const { mentor_id } = req.params;

    // Validate input
    if (!mentor_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {

        const now = new Date();

        // Create a new date object for the start of tomorrow
        const tomorrow = new Date(now);
        tomorrow.setHours(0, 0, 0, 0); // Set to midnight
        tomorrow.setDate(tomorrow.getDate() + 1); // Move to next day
        console.log(tomorrow);
        const availability = await prisma.mentor_availability.findMany({
            where: {
                mentor_id: parseInt(mentor_id),
                is_booked: false,
                date: {
                    gte: tomorrow // Ensure only slots from tomorrow onward are considered
                }
            },
            select: {
                id: true,
                date: true,
                start_time: true,
                end_time: true
            },
            orderBy: [
                { date: 'asc' }, // Sort by date in ascending order
                { start_time: 'asc' } // Sort by start_time in ascending order within the same date
            ]
        });
        res.status(200).json({ available_slots: availability });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch availability", details: err.message });
    }

}

// const bookMentorSlot = async (req, res) => {
//     const { student_id, mentor_availability_id } = req.body;
//     if (!student_id || !mentor_availability_id) {
//         return res.status(400).json({error: "Missing required fields"});
//     }
//
//     try {
//         const slot = await prisma.mentor_availability.findUnique({
//             where: {
//                 id: parseInt(mentor_availability_id),
//
//             },
//             include: { mentor_bookings: true }
//         });
//         if (!slot || slot.is_booked) {
//             return res.status(400).json({ error: "Slot not available" });
//         }
//
//         // Ensure no duplicate booking
//         const existingBooking = await prisma.mentor_bookings.findFirst({
//             where: { student_id:parseInt(student_id), date: slot.date }
//         });
//
//         if (existingBooking) {
//             return res.status(400).json({ error: "Student has already booked a slot on this date." });
//         }
//
//         await prisma.mentor_availability.update({
//             where: { id: parseInt(mentor_availability_id) },
//             data: { is_booked: true }
//         });
//
//         const response = await prisma.mentor_bookings.create({
//             data: {
//                 student_id: parseInt(student_id),
//                 mentor_id:parseInt( slot.mentor_id),
//                 counselor_availability_id: parseInt(mentor_availability_id),
//                 date: slot.date,
//                 start_time: slot.start_time,
//                 end_time: slot.end_time,
//                 status: "pending"
//             }
//         });
//
//         res.status(201).json({ message: "Booking request sent" , response: response });
//
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to book slot", details: err.message });
//     }
// }

const bookMentorSlot = async (req, res) => {
    const { student_id, mentor_availability_id } = req.body;

    // Validate input
    if (!student_id || !mentor_availability_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Fetch the availability slot
        const slot = await prisma.mentor_availability.findUnique({
            where: { id: parseInt(mentor_availability_id) },
            include: { mentor_bookings: true }
        });

        // Check if slot is available
        if (!slot || slot.is_booked) {
            return res.status(400).json({ error: "Slot not available" });
        }

        // Ensure no duplicate booking for the same date
        const existingBooking = await prisma.mentor_bookings.findFirst({
            where: {
                student_id: parseInt(student_id),
                date: slot.date,
                status: "pending" // Optionally check only pending bookings
            }
        });

        if (existingBooking) {
            return res.status(400).json({ error: "Student has already booked a slot on this date." });
        }

        // Update availability status
        await prisma.mentor_availability.update({
            where: { id: parseInt(mentor_availability_id) },
            data: { is_booked: true }
        });

        // Create a new mentor booking
        const response = await prisma.mentor_bookings.create({
            data: {
                student_id: parseInt(student_id),
                mentor_id: parseInt(slot.mentor_id), // Correctly reference mentor ID
                mentor_availability_id: parseInt(mentor_availability_id), // Use correct field name
                date: slot.date,
                start_time: slot.start_time,
                end_time: slot.end_time,
                status: "pending"
            }
        });

        res.status(201).json({ message: "Booking request sent successfully", bookingDetails: response });

    } catch (err) {
        console.error("Error booking mentor slot:", err);
        res.status(500).json({ error: "Failed to book slot", details: err.message });
    }
};


const getMentorSlot = async (req, res) => {
    const { booking_id } = req.params;
    console.log(booking_id);
    if (!booking_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const slot = await prisma.mentor_bookings.findUnique({
            where: {id: parseInt(booking_id)},
            include: {
                student: true,
                mentor: true,
                availability: true
            }
        });

        if (!slot) {
            return res.status(400).json({error: "Slot not available"});
        }
        res.status(200).json({booking: slot});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch booking", details: err.message});
    }


}

module.exports = {
    setMentorAvailability,
    getMentorAvailability,
    bookMentorSlot,
    getMentorSlot,
};