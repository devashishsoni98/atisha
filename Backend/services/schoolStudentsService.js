// //atisha/Backend/services/schoolStudentsService.js
// // schoolStudentsService.js

// const prisma = require('../prisma/client');

// // Service to save students
// exports.saveStudents = async (studentsData) => {
//   try {
//     const result = await prisma.school_students.createMany({
//       data: studentsData,
//     });
//     return result;
//   } catch (err) {
//     throw new Error('Error saving students: ' + err.message);
//   }
// };
const prisma = require('../prisma/client');

// Service to save students
exports.saveStudents = async (studentsData) => {
  try {
    const result = await prisma.school_students.createMany({
      data: studentsData,
    });
    return result;
  } catch (err) {
    throw new Error('Error saving students: ' + err.message);
  }
};
