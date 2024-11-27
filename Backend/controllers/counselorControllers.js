// controllers/counselorController.js
const {PrismaClient} = require('@prisma/client');
const axios = require("axios");
const prisma = new PrismaClient();

const createOrUpdateCounselorProfile = async (req, res) => {
    const {
        user_id,
        image,
        dob,
        gender,
        location,
        contact_number,
        degree,
        degree_image, // Assuming this is the correct field name for the degree image
        association,
        bio,
        year_of_experience,
        certificates,
        counselor_type, // Enum value for counselor type
        counselor_speciality, // Enum value for counselor specialty
        career_specialization, // Array of career specialties
    } = req.body;

    // Validate required fields
    if (!user_id || !dob || !gender || !location || !contact_number ||
        !degree || !degree_image || !association) {
        return res.status(400).json({message: "All fields are required."});
    }

    // Check if counselor_type is valid and handle career_specialization accordingly
    if (counselor_speciality !== 'career' && (career_specialization && career_specialization.length > 0)) {
        return res.status(400).json({message: "Career specialization can only be provided if counselor speciality is 'career'."});
    }

    try {
        // Convert dob to Date object
        const formattedDob = new Date(dob); // Ensure this is a valid date

        // Create or update counselor personal info
        const personalInfo = await prisma.counselor_personal_info.upsert({
            where: {user_id: user_id},
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
            where: {user_id: user_id},
            update: {
                degree,
                degree_image, // Use the correct field name for the degree image
                association,
            },
            create: {
                user_id: user_id,
                degree,
                degree_image, // Use the correct field name for the degree image
                association,
            },
        });

        // Create or update counselor professional info
        const professionalInfo = await prisma.counselor_professional.upsert({
            where: {user_id: user_id},
            update: {
                bio,
                year_of_experience,

                certificates, // Assuming this is an array of strings
                counselor_type, // Include if necessary
                counselor_speciality, // Include if necessary
                career_specialization: counselor_speciality === 'career' ? career_specialization : [], // Only set if type is 'career'
            },
            create: {
                user_id: user_id,
                bio,
                year_of_experience,

                certificates, // Assuming this is an array of strings
                counselor_type,
                counselor_speciality,
                career_specialization: counselor_type === 'career' ? career_specialization : [], // Only set if type is 'career'
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
        res.status(500).json({message: "Error while creating/updating counselor profile."});
    }
};

const getCounselorById = async (req, res) => {
    const {id} = req.params; // Get the counselor ID from the request parameters

    if (!id) {
        return res.status(400).json({message: "Counselor ID is required."});
    }

    try {
        // Fetch the counselor by ID
        const counselor = await prisma.users.findUnique({
            where: {id: parseInt(id)}, // Ensure the ID is an integer
            include: {
                counselor_personal_info: true,
                counselor_education: true,
                counselor_professional: true,
            },
        });

        if (!counselor) {
            return res.status(404).json({message: "Counselor not found."});
        }

        res.status(200).json(counselor);
    } catch (error) { 
        console.error("Error while fetching counselor in by id :", error);
        res.status(500).json({message: "Error while fetching counselor."});
    }
};

const getCounselorByRecommendation = async (req, res) => {
    const {counselor_id} = await req.params; // Get the counselor ID from the request parameters
    console.log("counselor: ", counselor_id);

    try {

        const recommendationCounselors = await axios.get(`http://127.0.0.1:7000/match_counselor?user_id=${counselor_id}`);
        console.log(recommendationCounselors.data.matches.counselor_id);
        const recommendations = recommendationCounselors.data.matches; // Adjust based on your actual response structure

        // Extract counselor IDs
        const counselorIds = recommendations.map(rec => rec.counselor_id);

        // Fetch details for each counselor
        const counselorsDetails = await prisma.users.findMany({
            where: {
                id: {
                    in: counselorIds, // Filter counselors by the extracted IDs
                },
            },
            include: {
                counselor_personal_info: true, // Include related career specializations if needed
                counselor_education: true,
                counselor_professional: true,
            },
        });

        // Extract data from responses


        res.status(200).json({recommendations, counselorsDetails});

    } catch (error) {
        console.error("Error while fetching counselor:", error);
        res.status(500).json({message: "Error while fetching counselor."});
    }
}

const getCounselorBySpecialization = async (req, res) => {
    const {specialty} = await req.params; // Get the counselor ID from the request parameters
    console.log("counselor: ", specialty);

    try {
        const counselor = await prisma.counselor_professional.findMany({
            where: {
                counselor_speciality: specialty,
            },
            include: {
                user: true,
            },
        });

        const counselorIds = counselor.map(c => c.user_id);

        const counselorsDetails = await prisma.users.findMany({
            where: {
                id: {
                    in: counselorIds, // Filter counselors by the extracted IDs
                },
            },
            include: {
                counselor_personal_info: true, // Include related career specializations if needed
                counselor_education: true,
                counselor_professional: true,
            },
        });

        res.status(200).json({counselor, counselorsDetails});
    } catch (error) {
        console.error("Error while fetching counselor:", error);
        res.status(500).json({message: "Error while fetching counselor."});
    }

}

const getAllCounselor = async (req, res) => {
    try {

        const roleId = await prisma.roles.findUnique({
            where: {
                role_name: 'counselor',
            },
        });

        console.log(roleId);

        const counselors = await prisma.users.findMany({
            where: {
                role_id: parseInt(roleId.id),
            },
            include: {
                counselor_personal_info: true,
                counselor_education: true,
                counselor_professional: true,
            },
        });

        if (!counselors.length) {
            return res.status(404).json({ message: "No counselors found." });
        }

        res.status(200).json(counselors);
        console.log(counselors);
    } catch (error) {
        console.error("Error while fetching counselors:", error);
        res.status(500).json({ message: "Error while fetching counselors.", error: error.message });
    }
};

module.exports = {
    createOrUpdateCounselorProfile,
    getCounselorById,
    getCounselorByRecommendation,
    getCounselorBySpecialization,
    getAllCounselor,
};
