const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new session report
const createSessionReport = async (req, res) => {
    const {
        student_id,
        counselor_id,
        mentor_id,
        mentor_booking_id,
        counselor_booking_id,
        session_date,
        session_time,
        student_name,
        counselor_name,
        duration,
        objective,
        topics_discussed,
        student_concerns,
        strengths_identified,
        areas_for_improvement,
        career_alignment,
        action_items,
        recommendations,
        follow_up_plan,
        additional_notes
    } = req.body;

    try {
        const sessionReport = await prisma.session_reports.create({
            data: {
                student_id: parseInt(student_id),
                counselor_id:parseInt(counselor_id),
                mentor_id: parseInt(mentor_id),
                mentor_booking_id: parseInt(mentor_booking_id),
                counselor_booking_id: parseInt(counselor_booking_id),
                session_date,
                session_time,
                student_name,
                counselor_name,
                duration:parseInt(duration),
                objective,
                topics_discussed,
                student_concerns,
                strengths_identified,
                areas_for_improvement,
                career_alignment,
                action_items,
                recommendations,
                follow_up_plan,
                additional_notes
            }
        });

        res.status(201).json({
            message: "Session report created successfully",
            sessionReport
        });
    } catch (error) {
        console.error("Error creating session report:", error);
        res.status(500).json({ message: "Error creating session report." });
    }
};

// Get all session reports
const getSessionReports = async (req, res) => {
    try {
        const reports = await prisma.session_reports.findMany();
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching session reports:", error);
        res.status(500).json({ message: "Error fetching session reports." });
    }
};

// Get a specific session report by ID
const getSessionReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await prisma.session_reports.findUnique({
            where: { id: parseInt(id) }
        });

        if (!report) {
            return res.status(404).json({ message: "Session report not found." });
        }

        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching session report:", error);
        res.status(500).json({ message: "Error fetching session report." });
    }
};

// Update a session report by ID
const updateSessionReport = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedReport = await prisma.session_reports.update({
            where: { id: parseInt(id) },
            data: updatedData
        });

        res.status(200).json({
            message: "Session report updated successfully",
            updatedReport
        });
    } catch (error) {
        console.error("Error updating session report:", error);
        res.status(500).json({ message: "Error updating session report." });
    }
};

// Delete a session report by ID
const deleteSessionReport = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.session_reports.delete({
            where: { id: parseInt(id) }
        });

        res.status(204).send(); // No content response after successful deletion
    } catch (error) {
        console.error("Error deleting session report:", error);
        res.status(500).json({ message: "Error deleting session report." });
    }
};

const getSessionReportByMentorId = async (req, res) => {
    const { mentor_id } = req.params;
    try {
        const sessions = await prisma.session_reports.findMany({
            where: { mentor_id: parseInt(mentor_id) },
            include: {
                student: true,
                mentor: true
            }
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching sessions.' });
    }
};

const getSessionReportByStudentId = async (req, res) => {
    const { student_id } = req.params;
    try {
        const sessions = await prisma.session_reports.findMany({
            where: { student_id: parseInt(student_id) },
            include: {
                student: true,
                counselor: true,
                mentor: true
            }
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching sessions.' });
    }
};

const getSessionReportByCounselorId = async (req, res) => {
    const { counselor_id } = req.params;
    try {
        const sessions = await prisma.session_reports.findMany({
            where: { counselor_id: parseInt(counselor_id) },
            include: {
                student: true,
                counselor: true
            }
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching sessions.' });
    }
};


const getSessionByCounselorBookingId = async (req, res) => {
    const { booking_id } = req.params;
    try {
        const session = await prisma.session_reports.findFirst({
            where: { counselor_booking_id: parseInt(booking_id) },
            include: {
                student: true,
                counselor: true,
                counselor_bookings: true
            }
        });
        res.json(session);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the session.' });
    }
}

module.exports = {
    createSessionReport,
    getSessionReports,
    getSessionReportById,
    updateSessionReport,
    deleteSessionReport,
    getSessionReportByMentorId,
    getSessionReportByStudentId,
    getSessionReportByCounselorId,
    getSessionByCounselorBookingId
};