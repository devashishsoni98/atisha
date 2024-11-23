const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateStudentProfile = async (req, res) => {
    const { userId, image, dob, gender, location, contactNumber, schoolName, classLevel, subjectIds, sportIds, hobbyIds } = req.body;
 
    // Check for required fields
    if (!userId || !dob || !gender || !location || !contactNumber || !schoolName || !classLevel || !subjectIds || !sportIds || !hobbyIds) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Ensure dob is a valid date
        const formattedDob = new Date(dob);
        if (isNaN(formattedDob.getTime())) {
            return res.status(400).json({ message: "Invalid date of birth." });
        }

        // Ensure userId is an integer
        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        // Create or update student personal info
        const personalInfo = await prisma.studentPersonalInfo.upsert({
            where: { userId: userIdInt },
            update: {
                image,
                dob: formattedDob,
                gender,
                location,
                contactNumber,
            },
            create: {
                userId: userIdInt,
                image,
                dob: formattedDob,
                gender,
                location,
                contactNumber,
            },
        });

        // Create or update student education info
        const educationInfo = await prisma.studentEducation.upsert({
            where: { userId: userIdInt },
            update: {
                schoolName,
                class: classLevel,
            },
            create: {
                userId: userIdInt,
                schoolName,
                class: classLevel,
            },
        });

        // Ensure subjectIds, sportIds, and hobbyIds are arrays
        const subjectIdsArray = Array.isArray(subjectIds) ? subjectIds : [];
        const sportIdsArray = Array.isArray(sportIds) ? sportIds : [];
        const hobbyIdsArray = Array.isArray(hobbyIds) ? hobbyIds : [];

        // Create or update student interests info
        const interestsInfo = await prisma.studentInterest.upsert({
            where: { userId: userIdInt },
            update: {
                subjectIds: subjectIdsArray,
                sportIds: sportIdsArray,
                hobbyIds: hobbyIdsArray,
            },
            create: {
                userId: userIdInt,
                subjectIds: subjectIdsArray,
                sportIds: sportIdsArray,
                hobbyIds: hobbyIdsArray,
            },
        });

        res.status(201).json({
            message: "Student profile created/updated successfully",
            personalInfo,
            educationInfo,
            interestsInfo,
        });
    } catch (error) {
        console.error("Error while creating/updating student profile:", error);
        res.status(500).json({ message: "Error while creating/updating student profile." });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params; // Get the student ID from the request parameters

    if (!id) {
        return res.status(400).json({ message: "Student ID is required." });
    }

    try {
        const idInt = parseInt(id);
        if (isNaN(idInt)) {
            return res.status(400).json({ message: "Invalid student ID." });
        }

        // Fetch the student by ID
        const student = await prisma.user.findUnique({
            where: { id: idInt },
            include: {
                studentPersonalInfo: true,
                studentEducation: true,
                studentInterest: true,
            },
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error while fetching student:", error);
        res.status(500).json({ message: "Error while fetching student." });
    }
};





module.exports = {
    createOrUpdateStudentProfile,
    getStudentById,
};

