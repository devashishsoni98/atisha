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
    throw error;
  }
};

module.exports = { saveFileMetadata };

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const FileModel = {
//   createFile: async (instituteId, fileName, classNumber) => {
//     return await prisma.files_upload.create({
//       data: {
//         classNumber: classNumber,
//         fileName: fileName,
//         instituteId: instituteId
//       }
//     });
//   }
// };

// module.exports = FileModel;
