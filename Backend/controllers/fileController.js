const multer = require('multer');
const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const upload = multer({ dest: 'uploads/' });

const uploadFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const instituteId = parseInt(req.body.instituteId);
    if (isNaN(instituteId)) {
      return res.status(400).json({ message: 'Invalid institute ID.' });
    }

    const uploadedData = {};

    for (const file of req.files) {
      const workbook = XLSX.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const requiredHeaders = ['name', 'enrolNo', 'schoolId'];
      const fileHeaders = Object.keys(jsonData[0] || {});

      if (!requiredHeaders.every(header => fileHeaders.includes(header))) {
        return res.status(400).json({ message: `The Excel file ${file.originalname} does not have the required headers.` });
      }

      const classNumber = parseInt(file.originalname.split('_')[1].split('.')[0]);
      if (isNaN(classNumber)) {
        return res.status(400).json({ message: `Invalid class number in filename: ${file.originalname}` });
      }

      uploadedData[classNumber] = jsonData;

      // Save file metadata
      const uploadedFile = await prisma.files_upload.create({
        data: {
          fileName: file.originalname,
          classNumber: classNumber,
          instituteId: instituteId,
        },
      });

      // Create school_students entries
      await prisma.school_students.createMany({
        data: jsonData.map(student => ({
          name: student.name,
          enrolNo: student.enrolNo,
          schoolId: student.schoolId,
          fileId: uploadedFile.id,
        })),
      });
    }

    res.status(200).json({ message: 'Files uploaded and parsed successfully', data: uploadedData });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Error uploading and parsing files' });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await prisma.files_upload.findMany({
      include: {
        institute_info: true,
        students: true,
      },
    });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error fetching files' });
  }
};

const getFileById = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await prisma.files_upload.findUnique({
      where: { id: parseInt(id) },
      include: {
        institute_info: true,
        students: true,
      },
    });
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Error fetching file' });
  }
};

module.exports = {
  uploadFiles,
  getAllFiles,
  getFileById
};
// const FileService = require('../services/fileService');

// const FileController = {
//   uploadFiles: async (req, res) => {
//     try {
//       if (!req.files || !req.body.instituteId) {
//         return res.status(400).json({ message: 'Files or instituteId missing' });
//       }

//       // Process file upload
//       const files = req.files.files;
//       const instituteId = parseInt(req.body.instituteId);

//       const result = await FileService.uploadFiles(instituteId, files);
      
//       return res.status(200).json({ message: 'Files uploaded successfully', files: result });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error uploading files', error: error.message });
//     }
//   }
// };

// module.exports = FileController;


