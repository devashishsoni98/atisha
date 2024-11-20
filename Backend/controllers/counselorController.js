// controllers/counselorController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateCounselorProfile = async (req, res) => {
    const { userId, image, dob, gender, location, contactNumber, degree, certificate, association, bio, yearOfExperience, domain } = req.body;

    if (!userId || !dob || !gender || !location || !contactNumber || !degree || !certificate || !association) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Convert dob to Date object
        const formattedDob = new Date(dob); // Ensure this is a valid date

        // Create or update counselor personal info
        const personalInfo = await prisma.counselorPersonalInfo.upsert({
            where: { userId: userId },
            update: {
                image,
                dob: formattedDob,
                gender,
                location,
                contactNumber,
            },
            create: {
                userId,
                image,
                dob: formattedDob,
                gender,
                location,
                contactNumber,
            },
        });

        // Create or update counselor education info
        const educationInfo = await prisma.counselorEducation.upsert({
            where: { userId: userId },
            update: {
                degree,
                certificate,
                association,
            },
            create: {
                userId,
                degree,
                certificate,
                association,
            },
        });

        // Create or update counselor professional info
        const professionalInfo = await prisma.counselorProfessional.upsert({
            where: { userId: userId },
            update: {
                bio,
                yearOfExperience,
                domain,
            },
            create: {
                userId,
                bio,
                yearOfExperience,
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
        const counselor = await prisma.user.findUnique({
            where: { id: parseInt(id) }, // Ensure the ID is an integer
            include: {
                counselorPersonalInfo: true,
                counselorEducation: true,
                counselorProfessional: true,
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