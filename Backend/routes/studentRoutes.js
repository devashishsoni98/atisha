const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  try {
    const result = await studentController.createOrUpdateStudentProfile(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error in student profile creation/update:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

module.exports = router;