const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { addHours } = require('date-fns');

// Set Availability
const setAvailability = async (req, res) => {
  const { counselor_id, date, start_time, end_time } = req.body;

  // Validate input
  if (!counselor_id || !date || !start_time || !end_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const startTime = new Date(`${date}T${start_time}`);
    const endTime = new Date(`${date}T${end_time}`);

    if (startTime >= endTime) {
      return res.status(400).json({ error: "Start time must be earlier than end time" });
    }

    const intervals = [];
    let currentStart = startTime;

    while (currentStart < endTime) {
      let nextEnd = addHours(currentStart, 2);
      if (nextEnd > endTime) nextEnd = endTime;

      intervals.push({
        counselor_id,
        date: new Date(date),
        start_time: currentStart,
        end_time: nextEnd
      });

      currentStart = nextEnd;
    }

    await prisma.counselor_availability.createMany({ data: intervals });
    res.status(201).json({ message: "Availability added successfully", slots_added: intervals });
  } catch (err) {
    res.status(500).json({ error: "Failed to add availability", details: err.message });
  }
};

// Get Availability
// const getAvailability = async (req, res) => {
//   const { counselor_id } = req.params;
//
//   try {
//     const slots = await prisma.counselor_availability.findMany({
//       where: { counselor_id: parseInt(counselor_id), is_booked: false, date: { gte: new Date() } },
//       select: { id: true, date: true, start_time: true, end_time: true }
//     });
//
//     res.status(200).json({ available_slots: slots });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch availability", details: err.message });
//   }
// };

const getAvailability = async (req, res) => {
  const { counselor_id } = req.params;

  try {
    // Get current date and time
    const now = new Date();

    // Create a new date object for the start of tomorrow
    const tomorrow = new Date(now);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to next day

    // Fetch available slots for the given counselor
    const slots = await prisma.counselor_availability.findMany({
      where: {
        counselor_id: parseInt(counselor_id),
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

    // Send the response with available slots
    res.status(200).json({ available_slots: slots });
  } catch (err) {
    // Handle any errors that occur during the fetch
    res.status(500).json({ error: "Failed to fetch availability", details: err.message });
  }
}

// Book Slot
const bookSlot = async (req, res) => {
  const { student_id, counselor_availability_id } = req.body;

  if (!student_id || !counselor_availability_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const slot = await prisma.counselor_availability.findUnique({
      where: { id: parseInt(counselor_availability_id) },
      include: { counselor_bookings: true }
    });

    if (!slot || slot.is_booked) {
      return res.status(400).json({ error: "Slot not available" });
    }

    // Ensure no duplicate booking
    const existingBooking = await prisma.counselor_bookings.findFirst({
      where: { student_id, date: slot.date }
    });

    if (existingBooking) {
      return res.status(400).json({ error: "Student has already booked a slot on this date." });
    }

    await prisma.counselor_availability.update({
      where: { id: parseInt(counselor_availability_id) },
      data: { is_booked: true }
    });

    await prisma.counselor_bookings.create({
      data: {
        student_id,
        counselor_id: slot.counselor_id,
        counselor_availability_id,
        date: slot.date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        status: "pending"
      }
    });

    res.status(201).json({ message: "Booking request sent" });
  } catch (err) {
    res.status(500).json({ error: "Failed to book slot", details: err.message });
  }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
  const { booking_id, status } = req.body;

  if (!booking_id || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const booking = await prisma.counselor_bookings.findUnique({
      where: { id: parseInt(booking_id) }
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking ID not found" });
    }

    await prisma.counselor_bookings.update({
      where: { id: parseInt(booking_id) },
      data: { status }
    });

    if (status === "rejected") {
      await prisma.counselor_availability.update({
        where: { id: booking.counselor_availability_id },
        data: { is_booked: false }
      });
    }

    res.status(200).json({ message: `Booking status updated to '${status}'.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status", details: err.message });
  }
};

// Complete Booking
const completeBooking = async (req, res) => {
  const { booking_id, status } = req.body;

  console.log(booking_id, status);

  if (!booking_id || !["completed", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const booking = await prisma.counselor_bookings.findUnique({
      where: { id: parseInt(booking_id) }
    });

    console.log(booking.status);

    if (!booking || (booking.status == "completed" && booking.status == "cancelled")) {
      return res.status(400).json({ error: "Cannot complete this booking" });
    }

    await prisma.counselor_bookings.update({
      where: { id: parseInt(booking_id) },
      data: { status }
    });

    res.status(200).json({ message: `Booking marked as ${status}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to complete booking", details: err.message });
  }
};

const getCounselorBookingsForApproval = async (req, res) => {
  const { counselor_id } = req.params;
  if (!counselor_id) {
  return res.status(400).json({ error: "Missing counselor_id" });
  }

  try {
    const bookings = await prisma.counselor_bookings.findMany({
      where: { counselor_id: parseInt(counselor_id),
        status:'pending'
      },
      include: {
        availability: true,
        student: true
      }
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
  }
}
const getCounselorBookingsForStarting = async (req, res) => {
  const { counselor_id } = req.params;
  if (!counselor_id) {
  return res.status(400).json({ error: "Missing counselor_id" });
  }

  try {
    const bookings = await prisma.counselor_bookings.findMany({
      where: { counselor_id: parseInt(counselor_id),
        status:'approved'
      },
      include: {
        availability: true,
        student: true
      }
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
  }
}


const getCounselorBookingsForCompletion = async (req, res) => {
  const {counselor_id} = req.params;
  if (!counselor_id) {
    return res.status(400).json({error: "Missing counselor_id"});
  }

  try {
    const bookings = await prisma.counselor_bookings.findMany({
      where: {
        counselor_id: parseInt(counselor_id),
        status: 'completed'
      },
      include: {
        availability: true,
        student: true
      }
    });
    res.status(200).json(bookings);

  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Failed to fetch bookings", details: err.message});
  }
}


module.exports = {
  setAvailability,
  getAvailability,
  bookSlot,
  updateBookingStatus,
  completeBooking,
  getCounselorBookingsForApproval,
  getCounselorBookingsForStarting,
  getCounselorBookingsForCompletion
};

