
// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();

// export const getStudentsByClass = async (req, res) => {
//   const { classNumber } = req.params;

//   try {
//     const students = await prisma.school_students.findMany({
//       where: { classNumber: parseInt(classNumber) },
//     });

//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch students.' });
//   }
// };
// Importing PrismaClient using CommonJS syntax
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// Function to get students by class number
// const getStudentsByClass = async (req, res) => {
//   const { classNumber } = req.params;

//   try {
//     const students = await prisma.school_students.findMany({
//       where: { classNumber: parseInt(classNumber) },
//     });

//     // Send the students data as JSON response
//     res.json(students);
//   } catch (error) {
//     // If there's an error, send an error response
//     res.status(500).json({ error: 'Failed to fetch students.' });
//   }
// };

// // Export the function using CommonJS syntax
// module.exports = { getStudentsByClass };


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStudentsByClass = async (req, res) => {
  const { classNumber } = req.params;

  try {
    const students = await prisma.school_students.findMany({
      where: { classNumber: parseInt(classNumber) },
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
};

module.exports = { getStudentsByClass };
