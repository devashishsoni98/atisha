// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const createActivity = async (data) => {
//   try {
//     // Create the activity first
//     const activity = await prisma.activity.create({
//       data: {
//         title: data.title,
//         description: data.description,
//         type: data.type,  // Can be "webinar", "quiz", or "workshop"
//         date: new Date(data.date),
//         speaker: data.speaker,  // For webinars and workshops
//         instructor: data.instructor,  // For workshops
//       }
//     });

//     // If it's a quiz, create the quiz and questions
//     if (data.type === "quiz" && data.questions) {
//       const quiz = await prisma.quiz.create({
//         data: {
//           title: data.quizTitle,
//           description: data.quizDescription,
//           questions: {
//             create: data.questions.map(q => ({
//               question: q.question,
//               optionA: q.optionA,
//               optionB: q.optionB,
//               optionC: q.optionC,
//               optionD: q.optionD,
//               correctOption: q.correctOption,
//             }))
//           }
//         }
//       });

//       // Associate quiz with activity
//       await prisma.activity.update({
//         where: { id: activity.id },
//         data: { quizId: quiz.id }
//       });
//     }

//     return activity;
//   } catch (error) {
//     throw new Error('Failed to create activity: ' + error.message);
//   }
// };

// module.exports = { createActivity };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Service method to create a new activity
const createActivity = async (activityData) => {
  try {
    const { title, description, type, date, speaker, instructor, quizId } = activityData;

    // Create the new activity in the database
    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        type,
        date,
        speaker,
        instructor,
        quizId, // Will be null for non-quiz activities
      },
    });

    return activity;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating activity');
  }
};

// Service method to fetch all activities
const getAllActivities = async () => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        quiz: true, // Include quiz details if activity is related to a quiz
        responses: true, // Include responses related to the activity
      },
    });

    return activities;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching activities');
  }
};

// Service method to fetch a single activity by ID
const getActivityById = async (id) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
      include: {
        quiz: true, // Include quiz details if activity is related to a quiz
        responses: true, // Include responses related to the activity
      },
    });

    return activity;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching activity');
  }
};

// Export the service methods
module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
};
