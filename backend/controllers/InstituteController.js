// controllers/instituteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateInstituteInfo = async (req, res) => {
    const { user_id, image_url, address, contact_number, establish_year, institute_type, student_body } = req.body;

    if (!user_id || !address || !contact_number || !establish_year || ! institute_type || !student_body) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Create or update institute info
        const instituteInfo = await prisma.institute_info.upsert({
            where: { user_id: user_id },
            update: {
                image_url: image_url,
                address: address,
                contact_number: contact_number,
                establish_year: establish_year,
                institute_type: institute_type,
                student_body: student_body,
            },
            create: {
                    user_id: user_id,
                image_url: image_url,
                address: address,
                contact_number: contact_number,
                establish_year: establish_year,
                institute_type: institute_type,
                student_body: student_body,
            },
        });

        res.status(201).json({
            message: "Institute information created/updated successfully",
            instituteInfo: instituteInfo,
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
        const institute = await prisma.institute_info.findUnique({
            where: { user_id: parseInt(id) }, // Ensure the ID is an integer
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