// const activityService = require('../services/activityService');

// const createActivity = async (req, res) => {
//   try {
//     const { title, description, type, date, speaker, instructor, quizTitle, quizDescription, questions } = req.body;

//     const newActivity = await activityService.createActivity({
//       title, description, type, date, speaker, instructor, quizTitle, quizDescription, questions
//     });

//     res.status(201).json({ success: true, data: newActivity });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { createActivity };

const ActivityService = require('../services/activityService');

// Controller for adding an activity (webinar, quiz, workshop)
const createActivity = async (req, res) => {
  try {
    const { title, description, type, date, speaker, instructor, quizId } = req.body;
    
    if (!title || !description || !type || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const activityData = {
      title,
      description,
      type,
      date: new Date(date),  // Convert date to Date object
      speaker,
      instructor,
      quizId: type === 'quiz' ? quizId : null,  // Only assign quizId for quiz activities
    };

    const activity = await ActivityService.createActivity(activityData);

    return res.status(201).json({
      message: 'Activity created successfully',
      activity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating activity' });
  }
};

// Controller for fetching all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityService.getAllActivities();
    return res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching activities' });
  }
};

// Controller for fetching a single activity by its ID
const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await ActivityService.getActivityById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    return res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching activity' });
  }
};

// Export the controller functions
module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
};
