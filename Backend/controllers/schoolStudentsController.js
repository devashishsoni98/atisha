// //atisha/Backend/controllers/schoolStudentsController.js
// const { PrismaClient } = require('@prisma/client');  // Correct import
// const prisma = new PrismaClient();  // Initialize Prisma Client
// const parseExcelFile = require('../utils/parseExcel');  // A utility to parse the Excel files

// // Controller to handle file uploads
// exports.uploadStudents = async (req, res) => {
//   const { classNumber } = req.body; // The class of the students
//   const file = req.file;  // The uploaded file

//   if (!file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Parse the file
//   const { data, error } = parseExcelFile(file);
//   if (error) {
//     return res.status(400).json({ error });
//   }

//   try {
//     // Mapping the parsed data to match the database schema
//     const studentsData = data.map(student => ({
//       name: student.name,
//       enrolNo: student.enrolNo,
//       schoolId: student.schoolId,
//       class: classNumber,
//     }));

//     // Save students data to the database
//     await prisma.school_students.createMany({
//       data: studentsData,
//     });

//     res.status(201).json({
//       message: 'Students uploaded successfully',
//       students: studentsData,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to save students to the database' });
//   }
// };
const { PrismaClient } = require('@prisma/client');  // Correct import
const prisma = new PrismaClient();  // Initialize Prisma Client
const parseExcelFile = require('../utils/parseExcel');  // A utility to parse the Excel files

// Controller to handle file uploads
const uploadStudents = async (req, res) => {
  const { classNumber } = req.body; // The class of the students
  const file = req.file;  // The uploaded file

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Parse the file
  const { data, error } = parseExcelFile(file);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    // Validate schoolId exists in institute_info table
    const schoolIds = [...new Set(data.map(student => student.schoolId))]; // Get unique schoolIds
    const institutes = await prisma.institute_info.findMany({
      where: {
        institute_code: { in: schoolIds },
      },
      select: {
        institute_code: true,
      },
    });
    const validSchoolIds = new Set(institutes.map(institute => institute.institute_code));
    
    // Filter students with valid schoolId
    const validStudents = data.filter(student => validSchoolIds.has(student.schoolId));

    if (validStudents.length === 0) {
      return res.status(400).json({ error: 'No valid schoolId found for students.' });
    }

    // Mapping the parsed data to match the database schema
    const studentsData = validStudents.map(student => ({
      name: student.name,
      enrolNo: student.enrolNo,
      schoolId: student.schoolId,
      class: classNumber,
    }));

    // Save students data to the database
    await prisma.school_students.createMany({
      data: studentsData,
    });

    res.status(201).json({
      message: 'Students uploaded successfully',
      students: studentsData,
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: 'Failed to save students to the database' });
  }
};


module.exports ={ uploadStudents};