// controllers/counselorController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateCounselorProfile = async (req, res) => {
    const { user_id, image, dob, gender, location, contact_number, degree, certificate, association, bio, year_of_experience, domain } = req.body;

    if (!user_id || !dob || !gender || !location || !contact_number || !degree || !certificate || !association) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Convert dob to Date object
        const formattedDob = new Date(dob); // Ensure this is a valid date

        // Create or update counselor personal info
        const personalInfo = await prisma.counselor_personal_info.upsert({
            where: { user_id: user_id },
            update: {
                image,
                dob: formattedDob,
                gender,
                location,
                contact_number,
            },
            create: {
                user_id: user_id,
                image,
                dob: formattedDob,
                gender,
                location,
                contact_number,
            }
        });

        // Create or update counselor education info
        const educationInfo = await prisma.counselor_education.upsert({
            where: { user_id: user_id },
            update: {
                degree,
                certificate,
                association,
            },
            create: {
                user_id: user_id,
                degree,
                certificate,
                association,
            },
        });

        // Create or update counselor professional info
        const professionalInfo = await prisma.counselor_professional.upsert({
            where: { user_id: user_id },
            update: {
                bio,
                year_of_experience,
                domain,
            },
            create: {
                user_id,
                bio,
                year_of_experience,
                domain,
            },
        });

        res.status(201).json({
            message: "Counselor profile created/updated successfully",
            personalInfo,
            educationInfo,
            professionalInfo,
        });
    } catch (error) {
        console.error("Error while creating/updating counselor profile:", error);
        res.status(500).json({ message: "Error while creating/updating counselor profile." });
    }
};

const getCounselorById = async (req, res) => {
    const { id } = req.params; // Get the counselor ID from the request parameters

    if (!id) {
        return res.status(400).json({ message: "Counselor ID is required." });
    }

    try {
        // Fetch the counselor by ID
        const counselor = await prisma.users.findUnique({
            where: { id: parseInt(id) }, // Ensure the ID is an integer
            include: {
                counselor_personal_info: true,
                counselor_education: true,
                counselor_professional: true,
            },
        });

        if (!counselor) {
            return res.status(404).json({ message: "Counselor not found." });
        }

        res.status(200).json(counselor);
    } catch (error) {
        console.error("Error while fetching counselor:", error);
        res.status(500).json({ message: "Error while fetching counselor." });
    }
};

module.exports = {
    createOrUpdateCounselorProfile,
    getCounselorById,
};