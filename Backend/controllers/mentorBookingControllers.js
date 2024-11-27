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
        res.status(200).json(availability);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch availability", details: err.message });
    }

}


module.exports = {
    setMentorAvailability,
    getMentorAvailability
};