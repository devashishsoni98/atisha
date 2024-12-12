// //atisha/Backend/utils/parseExcel.js
// const XLSX = require('xlsx');  // Library for reading Excel files

// // Utility to parse the Excel file
// const parseExcelFile = (file) => {
//   try {
//     const workbook = XLSX.read(file.buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     return { data: jsonData, error: null };
//   } catch (error) {
//     return { data: null, error: 'Failed to parse Excel file.' };
//   }
// };

// module.exports = parseExcelFile;
const XLSX = require('xlsx');  // Library for reading Excel files

// Utility to parse the Excel file
const parseExcelFile = (file) => {
  try {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return { data: jsonData, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to parse Excel file.' };
  }
};

module.exports = parseExcelFile;
