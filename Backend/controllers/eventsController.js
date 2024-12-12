const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();



const fetchAllEvent  = async (req, res) => {
    try {
        const events = await prisma.events.findMany();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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
        res.status(500).json({message: 'Error fetching upcoming events.'});
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
        res.status(500).json({message: 'Error fetching completed events.'});
    }
};

const fetchEventById = async (req, res) => {
        const eventId = parseInt(req.params.id);
        try {
            const event = await prisma.events.findUnique({
                where: {id: eventId},
                include: {
                    event_registrations: true,
                    event_requests: true,
                },
            })

            if (!event) {
                return res.status(404).json({message: 'Event not found'});
            }

            res.status(200).json(event);
        } catch
            (error) {
            console.error(error);
            res.status(500).json({message: 'Error fetching event.'});
        }
    }
;

const fetchEventRequestByCounselorId = async (req, res) => {
    const counselorId = parseInt(req.params.id);
    try {
        const eventRequests = await prisma.event_requests.findMany({
            where: {
                user_id: counselorId,
                status: 'pending',
            },
            include: {
                event: true,
            }
        });
        res.status(200).json(eventRequests);
        console.log(eventRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching event requests.'});
    }
}


const fetchAcceptedEventByCounselorId = async (req, res) => {
    const counselorId = parseInt(req.params.id);
    try {
        const eventRequests =await prisma.events.findMany({
            where: {
                status: 'scheduled',
                event_requests: {
                    some: {
                        user_id: counselorId,
                        status: 'accepted',
                    },
                },
            },
        });
        res.status(200).json(eventRequests);
        console.log(eventRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching event requests.'});
    }
}

const fetchEventRequestByMentorId = async (req, res) => {
    const counselorId = parseInt(req.params.id);
    try {
        const eventRequests = await prisma.event_requests.findMany({
            where: {
                user_id: mentorId,
                status: 'pending',
            },
            include: {
                event: true,
            }
        });
        res.status(200).json(eventRequests);
        console.log(eventRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching event requests.'});
    }
}

const fetchEventsForTomorrowAndToday = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const events = await prisma.events.findMany({
            where: {
                start_date: {
                    gte: today,
                    lte: tomorrow,
                },
            },
        });
        res.status(200).json(events);
        console.log(events);
        console.log(today);
        console.log(tomorrow);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching events.'});
    }

}

const fetchUpcomingEventOfToday = async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const events = await prisma.events.findMany({
            where: {
                start_date: {
                    gte: today,
                    lte: tomorrow,
                },
            },
        });
        res.status(200).json(events);
        console.log(events);
        console.log(today);
        console.log(tomorrow);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching events.'});
    }
}

module.exports = {
    fetchUpcomingEvents,
    fetchCompletedEvents,
    fetchEventById,
    fetchEventRequestByCounselorId,
    fetchAcceptedEventByCounselorId,
    fetchEventsForTomorrowAndToday,
    fetchUpcomingEventOfToday,
    fetchAllEvent
};
