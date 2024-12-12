// const { prisma } = require('../config/db');

// const saveFileMetadata = async (file) => {
//   try {
//     await prisma.files_upload.create({
//       data: {
//         fileName: file.originalname,
//         classNumber: file.classNumber,
//         uploadTime: new Date(),
//       },
//     });
//   } catch (error) {
//     console.error('Error saving file metadata:', error);
//   }
// };

// module.exports = { saveFileMetadata };
const { prisma } = require('../config/db');

const saveFileMetadata = async (file) => {
  try {
    await prisma.files_upload.create({
      data: {
        fileName: file.originalname,
        classNumber: file.classNumber,
        uploadTime: new Date(),
      },
    });
  } catch (error) {
    console.error('Error saving file metadata:', error);
  }
};

module.exports = { saveFileMetadata };
// const FileModel = require('../models/fileModel');
// const fs = require('fs');
// const path = require('path');

// const FileService = {
//   uploadFiles: async (instituteId, files) => {
//     const uploadedFiles = [];

//     // Loop through the files to process each one
//     for (const file of files) {
//       // Save the file to the filesystem (you can add additional processing here)
//       const filePath = path.join(__dirname, '../uploads', file.filename);

//       // Save the file metadata in the database
//       const fileRecord = await FileModel.createFile(instituteId, file.filename, file.classNumber);

//       uploadedFiles.push(fileRecord);

//       // Optionally, you can move the file to a specific directory if needed
//       fs.writeFileSync(filePath, file.buffer);
//     }

//     return uploadedFiles;
//   }
// };

// module.exports = FileService;
