
// //atisha/Backend/routes/schoolStudentsRoutes.js
// const express = require('express');
// const multer = require('multer');  // Multer for handling file uploads
// const schoolStudentsController = require('../controllers/schoolStudentsController');

// const upload = multer({ storage: multer.memoryStorage() });  // Use memory storage for file upload
// const router = express.Router();

// // Define a POST route to handle file upload
// router.post('/upload', upload.single('file'), schoolStudentsController.uploadStudents);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const { uploadStudents } = require('../controllers/schoolStudentsController');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route for uploading students
router.post('/upload', upload.single('file'), uploadStudents);

module.exports = router;
