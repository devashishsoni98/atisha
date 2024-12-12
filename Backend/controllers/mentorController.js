// controllers/mentorController.js

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createMentor = async (req, res) => {
    const {user_id, expertise, bio, certifications, degree, institution, year_of_experience, type, location, image_url, linkedin_profile } = req.body;

    // Validate required fields
    if (!user_id || !expertise || !certifications || !type) {
        return res.status(400).json({message: "User ID, expertise, certifications, and type are required."});
    }

    try {
        // Create a new mentor entry in the database.
        const newMentor = await prisma.mentors.create({
            data: {
                user_id: user_id,
                expertise: expertise,
                image_url: image_url,
                bio: bio,
                certifications: certifications,
                location: location,
            },
        });

        // Create an entry in the MentorEducation table if degree and institution are provided.
        if (degree && institution) {
            await prisma.mentor_education.create({
                data: {
                    user_id: user_id,
                    degree: degree,
                    institution: institution,
                },
            });
        }

        // Create an entry in the MentorProfessional table.
        await prisma.mentor_professional.create({
            data: {
                user_id: user_id,
                bio: bio,
                year_of_experience: year_of_experience,
                type: type,
                linkedin_profile: linkedin_profile,
            },
        });

        res.status(201).json({
            message: "Mentor created successfully",
            mentor: newMentor,
        });

    } catch (error) {
        console.error("Error while creating mentor:", error);
        res.status(500).json({message: "Error while creating mentor."});
    }
};


const getMentorById = async (req, res) => {
    const {id} = req.params; // Get the mentor ID from the request parameters

    try {
        // Fetch the mentor by ID
        const mentor = await prisma.mentors.findUnique({
            where: {user_id: parseInt(id)}, // Ensure the ID is an integer
            include: {
                user: true, // Include related user data if needed
                mentor_education: true, // Include education data if needed
                mentor_professional: true, // Include professional data if needed
            },
        });

        // Check if mentor exists
        if (!mentor) {
            return res.status(404).json({message: "Mentor not found."});
        }

        res.status(200).json(mentor);
    } catch (error) {
        console.error("Error while fetching mentor:", error);
        res.status(500).json({message: "Error while fetching mentor."});
    }
};

const getAllMentors = async (req, res) => {

    try {

        const roleId = await prisma.roles.findUnique({
            where: {
                role_name: 'mentor',
            },
        });

        console.log(roleId);

        const mentorsData = await prisma.users.findMany({
            where: {
                role_id: parseInt(roleId.id),
            },
            include: {
                mentors: true,
            },
        });


        const mentors = await prisma.mentors.findMany({
            where: {
                user_id: {
                    in: mentorsData.map(mentor => mentor.id),
                },
            },
            include: {
                user: true,
                mentor_education: true,
                mentor_professional: true,
            },
        });

        if (!mentors.length) {
            return res.status(404).json({message: "No counselors found."});
        }

        res.status(200).json(mentors);
        console.log(mentors);
    } catch (error) {
        console.error("Error while fetching mentors:", error);
        res.status(500).json({message: "Error while fetching mentors.", error: error.message});
    }
}

module.exports = {createMentor, getMentorById, getAllMentors};