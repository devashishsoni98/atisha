// controllers/recommendCareerController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// To fetch recommended career after quiz from Database
// const getRecommendedCareers = async (req, res) => {
//   try {
//     const { user_id } = req.body;

//     if (!user_id) {
//       return res.status(400).json({ error: 'User ID is required' });
//     }

//     // Convert user_id to an integer
//     const parsedUserId = parseInt(user_id, 10);

//     if (isNaN(parsedUserId)) {
//       return res.status(400).json({ error: 'Invalid User ID format' });
//     }

//     // Query the database
//     const recommendedCareers = await prisma.recommended_careers.findMany({
//       where: { user_id : parsedUserId },
//       select: {
//         career1: true,
//         career2: true,
//         career3: true,
//       },
//     });

//     if (!recommendedCareers) {
//       return res.status(404).json({ error: 'No recommended careers found for this user' });
//     }

//     // Clean the data
//     const cleanCareer = (career) => {
//         return career.replace(/^\d+\.\s\*\*(.+?)\*\*$/, '$1');
//       };

//       const cleanedCareers = {
//         career1: cleanCareer(recommendedCareers.career1),
//         career2: cleanCareer(recommendedCareers.career2),
//         career3: cleanCareer(recommendedCareers.career3),
//       };
  
//       return res.status(200).json(cleanedCareers);
//     } catch (error) {
//       console.error('Error fetching recommended careers:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   };

// module.exports = { getRecommendedCareers };

const getRecommendedCareers = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Convert user_id to an integer
    const parsedUserId = parseInt(user_id, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    // Query the database
    const recommendedCareers = await prisma.recommended_careers.findMany({
      where: { user_id: parsedUserId },
      select: {
        career1: true,
        career2: true,
        career3: true,
      },
    });

    if (!recommendedCareers || recommendedCareers.length === 0) {
      return res.status(404).json({ error: 'No recommended careers found for this user' });
    }

    // Assuming only one record is returned
    const { career1, career2, career3 } = recommendedCareers[0];

    // Clean the data
    const cleanCareer = (career) => {
      if (!career) return null; // Handle null or undefined values
      return career.replace(/^\d+\.\s\*\*(.+?)\*\*$/, '$1');
    };

    const cleanedCareers = {
      career1: cleanCareer(career1),
      career2: cleanCareer(career2),
      career3: cleanCareer(career3),
    };

    return res.status(200).json(cleanedCareers);
  } catch (error) {
    console.error('Error fetching recommended careers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getRecommendedCareers };