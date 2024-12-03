const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch upcoming events (status = "scheduled" and start_date > current date)
const fetchUpcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await prisma.events.findMany({
      where: {
        status: 'scheduled', // Filter events with status "scheduled"
        start_date: {
          gte: new Date(), // Ensure start_date is greater than or equal to the current date
        },
      },
      orderBy: {
        start_date: 'asc', // Order events by start date
      },
    });

    res.status(200).json(upcomingEvents);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ message: 'Error fetching upcoming events.' });
  }
};

// Fetch completed events (status = "completed" and end_date <= current date)
const fetchCompletedEvents = async (req, res) => {
  try {
    const completedEvents = await prisma.events.findMany({
      where: {
        status: 'completed', // Filter events with status "completed"
        end_date: {
          lte: new Date(), // Ensure end_date is less than or equal to the current date
        },
      },
      orderBy: {
        end_date: 'desc',  // Order events by end date (latest first)
      },
    });

    console.log(completedEvents);
    res.status(200).json(completedEvents);
  } catch (error) {
    console.error('Error fetching completed events:', error);
    res.status(500).json({ message: 'Error fetching completed events.' });
  }
};

module.exports = {
  fetchUpcomingEvents,
  fetchCompletedEvents,
};
