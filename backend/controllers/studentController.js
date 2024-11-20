// // // controllers/studentController.js
// // const studentModel = require('../models/studentModel');
//
// // const createOrUpdateStudentProfile = async (req, res) => {
// //     const { userId, image, dob, gender, location, contactNumber, schoolName, classLevel, subjectIds, sportIds, hobbyIds } = req.body;
//
// //     if (!userId || !dob || !gender || !location || !contactNumber || !schoolName || !classLevel || !subjectIds || !sportIds || !hobbyIds) {
// //         return res.status(400).json({ message: "All fields are required." });
// //     }
//
// //     try {
// //         // Create or update student personal info
// //         const personalInfo = await studentModel.createOrUpdateStudentPersonalInfo(userId, image, dob, gender, location, contactNumber);
//
// //         // Create or update student education info
// //         const educationInfo = await studentModel.createOrUpdateStudentEducation(userId, schoolName, classLevel);
//
// //         // Create or update student interests info
// //         const interestsInfo = await studentModel.createOrUpdateStudentInterests(userId, subjectIds, sportIds, hobbyIds);
//
// //         res.status(201).json({
// //             message: "Student profile created/updated successfully",
// //             personalInfo,
// //             educationInfo,
// //             interestsInfo,
// //         });
// //     } catch (error) {
// //         console.error("Error while creating/updating student profile:", error);
// //         res.status(500).json({ message: "Error while creating/updating student profile." });
// //     }
// // };
//
// // module.exports = {
// //     createOrUpdateStudentProfile,
// // };
// // controllers/studentController.js
// const studentModel = require('../models/studentModel');
//
// const createOrUpdateStudentProfile = async (req, res) => {
//     const { userId, image, dob, gender, location, contactNumber, schoolName, classLevel, subjectIds, sportIds, hobbyIds } = req.body;
//
//     if (!userId || !dob || !gender || !location || !contactNumber || !schoolName || !classLevel || !subjectIds || !sportIds || !hobbyIds) {
//         return res.status(400).json({ message: "All fields are required." });
//     }
//
//     try {
//         // Create or update student personal info
//         const personalInfo = await studentModel.createOrUpdateStudentPersonalInfo(userId, image, dob, gender, location, contactNumber);
//
//         // Create or update student education info
//         const educationInfo = await studentModel.createOrUpdateStudentEducation(userId, schoolName, classLevel);
//
//         // Create or update student interests info
//         const interestsInfo = await studentModel.createOrUpdateStudentInterests(userId, subjectIds, sportIds, hobbyIds);
//
//         res.status(201).json({
//             message: "Student profile created/updated successfully",
//             personalInfo,
//             educationInfo,
//             interestsInfo,
//         });
//     } catch (error) {
//         console.error("Error while creating/updating student profile:", error);
//         res.status(500).json({ message: "Error while creating/updating student profile." });
//     }
// };
//
// module.exports = {
//     createOrUpdateStudentProfile,
// };


// controllers/studentController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrUpdateStudentProfile = async (req, res) => {
    const { userId, image, dob, gender, location, contactNumber, schoolName, classLevel, subjectIds, sportIds, hobbyIds } = req.body;

    if (!userId || !dob || !gender || !location || !contactNumber || !schoolName || !classLevel || !subjectIds || !sportIds || !hobbyIds) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const formattedDob = new Date(dob); // Ensure this is a valid date

        // Create or update student personal info
        const personalInfo = await prisma.studentPersonalInfo.upsert({
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

        // Create or update student education info
        const educationInfo = await prisma.studentEducation.upsert({
            where: { userId: userId },
            update: {
                schoolName,
                class: classLevel,
            },
            create: {
                userId,
                schoolName,
                class: classLevel,
            },
        });

        // Create or update student interests info
        const interestsInfo = await prisma.studentInterest.upsert({
            where: { userId: userId },
            update: {
                subjectIds: subjectIds,
                sportIds: sportIds,
                hobbyIds: hobbyIds,
            },
            create: {
                userId,
                subjectIds,
                sportIds,
                hobbyIds,
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

module.exports = {
    createOrUpdateStudentProfile,
};