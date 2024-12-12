const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only Excel files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB file size limit
  }
});

// POST route for uploading multiple files
router.post('/upload', upload.fields([
  { name: 'files', maxCount: 5 },
  { name: 'instituteId', maxCount: 1 }
]), FileController.uploadFiles);

// GET route for fetching all files
router.get('/', FileController.getAllFiles);

// GET route for fetching file metadata by ID
router.get('/:id', FileController.getFileById);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const FileController = require('../controllers/fileController');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
//     cb(null, true);  // Accept the file
//   } else {
//     cb(new Error('Invalid file type. Only Excel files are allowed.'), false);  // Reject the file
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 }  // 5MB file size limit
// });

// // Routes
// router.post('/upload', upload.fields([{ name: 'files', maxCount: 5 }, { name: 'instituteId', maxCount: 1 }]), FileController.uploadFiles);

// module.exports = router;
