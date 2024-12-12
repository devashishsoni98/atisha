const axios = require('axios');
const rapidAPI = require('../config/rapidAPI');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client


// External API URLs (use environment variables if possible)
const API_URL_1 = process.env.API_URL_1 || `http://localhost:7000/lens/career-lens`;

// Function to dynamically create API_URL_2 based on career_name
const API_URL_2 = (career_name) =>
  `http://localhost:4000/api/careerLens/salary?job_title=${encodeURIComponent(career_name)}&location=India`;



// Controller function to get career data
exports.getCareerData = async (req, res) => {
  const { career_name } = req.body;

  try {
    // Check if the career exists in the database using Prisma
    const career = await prisma.career_lens.findUnique({
      where: {
        name: career_name,
      },
    });

    if (career) {
      // Career found in the database, return the data
      console.log(`Career found in database: ${career_name}`);
      return res.json(career);
    } else {
      // Career not found, call external APIs to fetch data
      console.log(`Career not found in database. Fetching from APIs: ${career_name}`);
      
      // Call the first API to get initial data
      const apiResponse1 = await axios.post(API_URL_1, { career_name }); // Assuming POST request
      
      // Call the second API to get salary data
      const apiResponse2 = await axios.get(API_URL_2(career_name));
      
      // Log response from the second API
      console.log('API Response 2:', apiResponse2.data);

      // Prepare new career data based on API responses
      const newCareerData = {
        name: career_name,
        description: apiResponse1.data.description || 'No description available',
        skills: apiResponse1.data.skills,
        pros: apiResponse1.data.pros || [], // Assuming 'pros' is an array returned from API 1
        cons: apiResponse1.data.cons || [],
        related_careers: apiResponse1.data.related_careers || [] ,
        trend: apiResponse1.data.trend || [],
        min_salary: apiResponse2.data.min_salary || 0,
        max_salary: apiResponse2.data.max_salary || 0,
        median_salary: apiResponse2.data.median_salary || 0,
        currency: apiResponse2.data.currency || 'INR',
        period: apiResponse2.data.period || 'YEAR',

    
      };

      // Optionally store this new data in the database if needed
    //   await prisma.career_lens.create({
    //     data: newCareerData,
    //   });

      console.log(`New career data saved to database: ${career_name}`);
      
      // Return the new career data
      return res.json(newCareerData);
    }
  } catch (error) {
    console.error('Error fetching or saving career data:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};





// Controller to fetch salary data
// exports.getSalaryData = async (req, res) => {
//   const { job_title, location } = req.query;

//   const options = {
//     method: 'GET',
//     url: 'https://jsearch.p.rapidapi.com/estimated-salary',
//     params: {
//       job_title,
//       location: location || 'India',
//       location_type: 'COUNTRY',
//     },
//     headers: {
//       'X-RapidAPI-Key': rapidAPI.rapidApiKey,
//       'X-RapidAPI-Host': rapidAPI.rapidApiHost,
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const salaryData = response.data.data[0]; // Extract relevant data

//     if (!salaryData) {
//       return res.status(404).json({ error: 'Salary data not found' });
//     }

//     res.json({
//       min_salary: salaryData.min_salary,
//       max_salary: salaryData.max_salary,
//       median_salary: salaryData.median_salary,
//       currency: salaryData.salary_currency || 'INR',
//       period: salaryData.salary_period || 'YEAR',
//     });
//   } catch (error) {
//     console.error('Error fetching salary data:', error.message);
//     res.status(500).json({
//       error: 'Error fetching salary data',
//       details: error.message,
//     });
//   }
// };

 
exports.getSalaryData = async (req, res) => {
  const { job_title, location } = req.query;

  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/estimated-salary',
    params: {
      job_title,
      location: location || 'India',
      location_type: 'COUNTRY',
    },
    headers: {
      'X-RapidAPI-Key': rapidAPI.rapidApiKey,
      'X-RapidAPI-Host': rapidAPI.rapidApiHost,
    },
  };

  try {
    const response = await axios.request(options);
    const salaryData = response.data.data[0]; // Extract relevant data

    if (!salaryData) {
      return res.status(404).json({ error: 'Salary data not found' });
    }

    // Prepare the data to be stored
    const newSalaryData = {
      min_salary: salaryData.min_salary,
      max_salary: salaryData.max_salary,
      median_salary: salaryData.median_salary,
      currency: salaryData.salary_currency || 'INR',
      period: salaryData.salary_period || 'YEAR',
    };

    // Check if the career already exists in the database
    const existingCareer = await prisma.career_lens.findUnique({
      where: { name: job_title },
    });

    if (existingCareer) {
      // Update existing career with new salary data
      await prisma.career_lens.update({
        where: { id: existingCareer.id }, // Use the ID of the existing record
        data: newSalaryData,
      });
      console.log(`Updated salary data for career: ${job_title}`);
      
      // Return updated career data
      return res.json({ ...existingCareer, ...newSalaryData });
    } else {
      // If the career does not exist, create a new record with salary data
      const createdCareer = await prisma.career_lens.create({
        data: {
          name: job_title,
          ...newSalaryData,
          // Add any other default fields you want to set for a new career here
        },
      });
      console.log(`Created new career entry in database: ${job_title}`);
      
      // Return newly created career data
      return res.json(createdCareer);
    }
  } catch (error) {
    console.error('Error fetching salary data:', error.message);
    res.status(500).json({
      error: 'Error fetching salary data',
      details: error.message,
    });
  }
};

