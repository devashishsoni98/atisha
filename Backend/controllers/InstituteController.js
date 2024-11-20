// controllers/instituteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateInstituteInfo = async (req, res) => {
    const { userId, imageId, address, contactNumber, establishYear, instituteType, studentBody } = req.body;

    if (!userId || !address || !contactNumber || !establishYear || !instituteType || !studentBody) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Create or update institute info
        const instituteInfo = await prisma.instituteInfo.upsert({
            where: { userId: userId },
            update: {
                imageId,
                address,
                contactNumber,
                establishYear,
                instituteType,
                studentBody,
            },
            create: {
                userId,
                imageId,
                address,
                contactNumber,
                establishYear,
                instituteType,
                studentBody,
            },
        });

        res.status(201).json({
            message: "Institute information created/updated successfully",
            instituteInfo,
        });
    } catch (error) {
        console.error("Error while creating/updating institute information:", error);
        res.status(500).json({ message: "Error while creating/updating institute information." });
    }
};

const getInstituteById = async (req, res) => {
    const { id } = req.params; // Get the institute ID from the request parameters

    if (!id) {
        return res.status(400).json({ message: "Institute ID is required." });
    }

    try {
        // Fetch the institute by ID
        const institute = await prisma.instituteInfo.findUnique({
            where: { userId: parseInt(id) }, // Ensure the ID is an integer
            include: {
                user: true, // Include related user data if needed
            },
        });

        if (!institute) {
            return res.status(404).json({ message: "Institute not found." });
        }

        res.status(200).json(institute);
    } catch (error) {
        console.error("Error while fetching institute:", error);
        res.status(500).json({ message: "Error while fetching institute." });
    }
};

module.exports = {
    createOrUpdateInstituteInfo,
    getInstituteById,
};