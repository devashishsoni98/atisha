// controllers/mentorController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createMentor = async (req, res) => {
    const { userId, expertise, bio, certifications, degree, institution, yearOfExperience, type } = req.body;

    // Validate required fields
    if (!userId || !expertise || !certifications || !type) {
        return res.status(400).json({ message: "User ID, expertise, certifications, and type are required." });
    }

    try {
        // Create a new mentor entry in the database.
        const newMentor = await prisma.mentor.create({
            data: {
                userId,
                expertise,
                bio,
                certifications,
            },
        });

        // Create an entry in the MentorEducation table if degree and institution are provided.
        if (degree && institution) {
            await prisma.mentorEducation.create({
                data: {
                    userId,
                    degree,
                    institution,
                },
            });
        }

        // Create an entry in the MentorProfessional table.
        await prisma.mentorProfessional.create({
            data: {
                userId,
                bio,
                yearOfExperience,
                type,
            },
        });

        res.status(201).json({
            message: "Mentor created successfully",
            mentor: newMentor,
        });

    } catch (error) {
        console.error("Error while creating mentor:", error);
        res.status(500).json({ message: "Error while creating mentor." });
    }
};


const getMentorById = async (req, res) => {
    const { id } = req.params; // Get the mentor ID from the request parameters

    try {
        // Fetch the mentor by ID
        const mentor = await prisma.mentor.findUnique({
            where: { userId: parseInt(id) }, // Ensure the ID is an integer
            include: {
                user: true, // Include related user data if needed
                MentorEducation: true, // Include education data if needed
                MentorProfessional: true, // Include professional data if needed
            },
        });

        // Check if mentor exists
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found." });
        }

        res.status(200).json(mentor);
    } catch (error) {
        console.error("Error while fetching mentor:", error);
        res.status(500).json({ message: "Error while fetching mentor." });
    }
};

module.exports = { createMentor, getMentorById };