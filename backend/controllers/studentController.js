const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// const createOrUpdateStudentProfile = async (req, res) => {
//     const { user_id, image, dob, gender, location, contact_number, school_name, class_level, subject_ids, sport_ids, hobby_ids } = req.body;
 
//     // Check for required fields
//     if (!user_id || !dob || !gender || !location || !contact_number || !school_name || !class_level || !subject_ids || !sport_ids || !hobby_ids) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//         // Ensure dob is a valid date
//         const formattedDob = new Date(dob);
//         if (isNaN(formattedDob.getTime())) {
//             return res.status(400).json({ message: "Invalid date of birth." });
//         }

//         // Ensure userId is an integer
//         const userIdInt = parseInt(user_id);
//         if (isNaN(userIdInt)) {
//             return res.status(400).json({ message: "Invalid user ID." });
//         }

//         // Create or update student personal info
//         const personalInfo = await prisma.student_personal_info.upsert({
//             where: { user_id: userIdInt },
//             update: {
//                 image:image,
//                 dob: formattedDob,
//                 gender:gender,
//                 location:location,
//                 contact_number :contact_number,
//             },
//             create: {
//                 user_id: userIdInt,
//                 image:image,
//                 dob: formattedDob,
//                 gender:gender,
//                 location:location,
//                 contact_number :contact_number,
//             },
//         });

//         // Create or update student education info
//         const educationInfo = await prisma.student_education.upsert({
//             where: { user_id: userIdInt },
//             update: {
//                 school_name:school_name,
//                 class: class_level,
//             },
//             create: {
//                 user_id: userIdInt,
//                 school_name:school_name,
//                 class: class_level,
//             },
//         });

//         // Ensure subjectIds, sportIds, and hobbyIds are arrays
//         const subjectIdsArray = Array.isArray(subject_ids) ? subject_ids : [];
//         const sportIdsArray = Array.isArray(sport_ids) ? sport_ids : [];
//         const hobbyIdsArray = Array.isArray(hobby_ids) ? hobby_ids : [];

//         // Create or update student interests info
//         const interestsInfo = await prisma.student_interest.upsert({
//             where: { user_id: userIdInt },
//             update: {
//                 subject_ids: subjectIdsArray,
//                 sport_ids: sportIdsArray,
//                 hobby_ids: hobbyIdsArray,
//             },
//             create: {
//                 user_id: userIdInt,
//                 subject_ids: subjectIdsArray,
//                 sport_ids: sportIdsArray,
//                 hobby_ids: hobbyIdsArray,
//             },
//         });

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

const createOrUpdateStudentProfile = async (req, res) => {
    const { user_id, image, dob, gender, location, contact_number, school_name, school_code, class_level, subject_ids, sport_ids, hobby_ids } = req.body;

    if (!user_id || !dob || !gender || !location || !contact_number || (!school_name && !school_code) || !class_level || !subject_ids || !sport_ids || !hobby_ids) {
        return res.status(400).json({ message: "All fields are required, including either school_name or school_code." });
    }

    try {
        // Ensure dob is a valid date
        const formattedDob = new Date(dob);
        if (isNaN(formattedDob.getTime())) {
            return res.status(400).json({ message: "Invalid date of birth." });
        }

        // Ensure userId is an integer
        const userIdInt = parseInt(user_id);
        if (isNaN(userIdInt)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        let instituteId = null;
        let resolvedSchoolName = school_name;

        // Fetch school info if school_code is provided
        if (school_code) {
            const schoolInfo = await prisma.institute_info.findUnique({
                where: { institute_code:school_code },
                select: { user_id: true, name: true },
            });

            if (!schoolInfo) {
                return res.status(404).json({ message: "School code not found." });
            }

            instituteId = schoolInfo.user_id;
            resolvedSchoolName = schoolInfo.name;
        }

        // Create or update student personal info
        const personalInfo = await prisma.student_personal_info.upsert({
            where: { user_id: userIdInt },
            update: { image, dob: formattedDob, gender, location, contact_number },
            create: { user_id: userIdInt, image, dob: formattedDob, gender, location, contact_number },
        });

        // Create or update student education info
        const educationInfo = await prisma.student_education.upsert({
            where: { user_id: userIdInt },
            update: { school_name: resolvedSchoolName, class: class_level },
            create: { user_id: userIdInt, school_name: resolvedSchoolName, class: class_level },
        });

        // Ensure subjectIds, sportIds, and hobbyIds are arrays
        const subjectIdsArray = Array.isArray(subject_ids) ? subject_ids : [];
        const sportIdsArray = Array.isArray(sport_ids) ? sport_ids : [];
        const hobbyIdsArray = Array.isArray(hobby_ids) ? hobby_ids : [];

        // Create or update student interests info
        const interestsInfo = await prisma.student_interest.upsert({
            where: { user_id: userIdInt },
            update: { subject_ids: subjectIdsArray, sport_ids: sportIdsArray, hobby_ids: hobbyIdsArray },
            create: { user_id: userIdInt, subject_ids: subjectIdsArray, sport_ids: sportIdsArray, hobby_ids: hobbyIdsArray },
        });

        // Add a record to institute_student if school_code is provided
        if (instituteId) {
            await prisma.institute_student.create({
                data: {
                    institute_id: instituteId,
                    student_id: userIdInt,
                },
            });
        }

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


// const getStudentById = async (req, res) => {
//     const { id } = req.params; // Get the student ID from the request parameters

//     if (!id) {
//         return res.status(400).json({ message: "Student ID is required." });
//     }

//     try {
//         const idInt = parseInt(id);
//         if (isNaN(idInt)) {
//             return res.status(400).json({ message: "Invalid student ID." });
//         }

//         // Fetch the student by ID
//         const student = await prisma.users.findUnique({
//             where: { id: idInt },
//             include: {
//                 student_personal_info: true,
//                 student_education: true,
//                 student_interest: true,
//             },
//         });

//         if (!student) {
//             return res.status(404).json({ message: "Student not found." });
//         }

//         res.status(200).json(student);
//     } catch (error) {
//         console.error("Error while fetching student:", error);
//         res.status(500).json({ message: "Error while fetching student." });
//     }
// };

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
        const student = await prisma.users.findUnique({
            where: { id: idInt },
            include: {
                student_personal_info: true,
                student_education: true,
                student_interest: true, // Fetch only the IDs of interests (subject_ids, sport_ids, hobby_ids)
            },
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // Now, fetch the names of subjects, hobbies, and sports
        const [subjects, hobbies, sports] = await Promise.all([
            prisma.master_subjects.findMany({
                where: { id: { in: student.student_interest.subject_ids } },
                select: { id: true, subject_name: true },
            }),
            prisma.master_hobbies.findMany({
                where: { id: { in: student.student_interest.hobby_ids } },
                select: { id: true, hobby_name: true }, // assuming field is hobby_name
            }),
            prisma.master_sports.findMany({
                where: { id: { in: student.student_interest.sport_ids } },
                select: { id: true, sport_name: true }, // assuming field is sport_name
            })
        ]);

        // Add the fetched names to the student object
        student.student_interest.subjects = subjects;
        student.student_interest.hobbies = hobbies;
        student.student_interest.sports = sports;

        // Remove the subject_ids, sport_ids, and hobby_ids from the response
        delete student.student_interest.subject_ids;
        delete student.student_interest.sport_ids;
        delete student.student_interest.hobby_ids;

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

