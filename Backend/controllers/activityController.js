const activityService = require('../services/activityService');

const createActivity = async (req, res) => {
  try {
    const { title, description, type, date } = req.body;
    const newActivity = await activityService.createActivity({ title, description, type, date: new Date(date) });
    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createActivity };
