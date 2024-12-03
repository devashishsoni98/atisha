const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const { addHours } = require('date-fns');
const { formatISO } = require('date-fns')


const setAvailability = async (req, res) => {
  const { counselor_id, date, start_time, end_time } = req.body;

  console.log(counselor_id, date, start_time, end_time);

  // Validate input
  if (!counselor_id || !date || !start_time || !end_time) {
    return res.status(100).json({ error: "Missing required fields" });
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
    
    // Round down to the nearest hour for the first slot
    let currentStart = new Date(startTime);
    currentStart.setMinutes(0); // Set minutes to zero

    while (currentStart < endTime) {
      let nextEnd = new Date(currentStart);
      nextEnd.setHours(currentStart.getHours() + 2); // Add 2 hours for each slot
      
      // Round nextEnd down to the nearest hour
      nextEnd.setMinutes(0); // Set minutes to zero

      // Ensure nextEnd does not exceed endTime
      if (nextEnd > endTime) nextEnd = new Date(endTime);
      
      intervals.push({
        counselor_id: parseInt(counselor_id),
        date: new Date(date), // Store only the date part
        start_time: formatISO(currentStart), // Store as ISO string
        end_time: formatISO(nextEnd) // Store as ISO string
      });

      // Move to the next slot (increment by 2 hours)
      currentStart.setHours(currentStart.getHours() + 2); 
      currentStart.setMinutes(0); // Ensure it's rounded down to the nearest hour
    }

    console.log(intervals);
    
    await prisma.counselor_availability.createMany({ data: intervals });
    
    res.status(201).json({ message: "Availability added successfully", slots_added: intervals });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add availability", details: err.message });
  }
};



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

    // Format times to ISO strings before sending response
    const formattedSlots = slots.map(slot => ({
      id: slot.id,
      date: slot.date,
      start_time:formatISO(slot.start_time), // Convert timestamp to ISO string
      end_time: formatISO(slot.end_time) // Convert timestamp to ISO string
    }));

    // Send the response with available slots
    res.status(200).json({ available_slots: formattedSlots });
  } catch (err) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching availability:", err);
    res.status(500).json({ error: "Failed to fetch availability", details: err.message });
  }
};


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

    console.log(slot.is_booked);
    
    if (!slot || slot.is_booked) {
      console.log({ error: "Slot not available" });
      return res.status(200).json({ error: "Slot not available" });
    }

    // Ensure no duplicate booking
    const existingBooking = await prisma.counselor_bookings.findFirst({
      where: { student_id:parseInt(student_id), date: slot.date }
    });

    if (existingBooking) {
      console.log({ error: "Student has already booked a slot on this date." });
      return res.status(200).json({ error: "Student has already booked a slot on this date." });
    }

    await prisma.counselor_availability.update({
      where: { id: parseInt(counselor_availability_id) },
      data: { is_booked: true }
    });

   const response = await prisma.counselor_bookings.create({
      data: {
        student_id: parseInt(student_id),
        counselor_id:parseInt( slot.counselor_id),
        counselor_availability_id: parseInt(counselor_availability_id),
        date: slot.date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        status: "pending"
      }
    });
    console.log("book slot successfully");
    
   res.status(201).json({ message: "Booking request sent" , response: response });

    // res.status(201).json({ message: "Booking request sent" });
  } catch (err) {
    
    
    console.log({ error: "Failed to book slot", details: err.message });
    res.status(500).json({ error: "Failed to book slot", details: err.message });
  }
};

const getSlot = async (req, res) => {
  const {booking_id} = req.params;
  try {
    const slot = await prisma.counselor_bookings.findUnique({
      where: {id: parseInt(booking_id)},
      include: {
        counselor_availability: true,
        counselor: true
      }
    });
    if (!slot) {
      return res.status(404).json({error: "Booking ID not found"});
    }
    res.status(200).json({booking: slot});
  } catch (err) {
    res.status(500).json({error: "Failed to fetch booking", details: err.message});
  }
}
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


// Get Counselor Bookings for Approval
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

// Get Counselor Bookings for Starting
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

const getBookingByStudentId = async (req, res) => {
  const { student_id } = req.params;
  if (!student_id) {
    return res.status(400).json({ error: "Missing student_id" });
  }
  try {
    const bookings = await prisma.counselor_bookings.findMany({
      where: { student_id: parseInt(student_id) },
      include: {
        availability: true,
        student: true,
        counselor: true
      }
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
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
  getCounselorBookingsForCompletion,
  getBookingByStudentId,
  getSlot
};

