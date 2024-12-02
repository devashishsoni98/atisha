const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generic function to handle adding values dynamically for different types
const addMasterValue = async (req, res) => {
  const { type } = req.params;  // The type (subjects, sports, hobbies)
  const { name } = req.body;  // The comma-separated names of the values to add

  if (!name) {
    return res.status(400).json({ message: "Name is required." });
  }

  // Convert the comma-separated string into an array
  const namesArray = name.split(',').map(item => item.trim());

  try {
    // Dynamically map type to the corresponding Prisma model and column
    let model;
    let column;
    switch (type) {
      case 'subjects':
        model = prisma.master_subjects;
        column = 'subject_name';
        break;
      case 'sports':
        model = prisma.master_sports;
        column = 'sport_name';
        break;
      case 'hobbies':
        model = prisma.master_hobbies;
        column = 'hobby_name';
        break;
      default:
        return res.status(400).json({ message: "Invalid master type." });
    }

    const results = [];

    // Loop through each name and check if it exists
    for (let name of namesArray) {
      const existingValue = await model.findUnique({
        where: {
          [column]: name, // Dynamically reference the column name
        },
      });

      if (existingValue) {
        // If value already exists, add it to the results with ID and name
        results.push({
          message: `${name} already exists.`,
          existingValue: {
            id: existingValue.id,
            name: existingValue[column], // Dynamically access the name field
          },
        });
      } else {
        // If value does not exist, add it to the database
        const newValue = await model.create({
          data: { [column]: name }, // Dynamically pass the column name
        });
        results.push({
          message: `${name} added successfully.`,
          newValue: newValue,
        });
      }
    }

    // Return the results for each name processed
    res.status(201).json(results);

  } catch (error) {
    console.error("Error adding custom value:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Generic function to handle fetching values dynamically for different types
const getMasterValues = async (req, res) => {
  const { type } = req.params;  // The type (subjects, sports, hobbies)

  try {
    // Dynamically map type to the corresponding Prisma model and column
    let model;
    switch (type) {
      case 'subjects':
        model = prisma.master_subjects;
        break;
      case 'sports':
        model = prisma.master_sports;
        break;
      case 'hobbies':
        model = prisma.master_hobbies;
        break;
      default:
        return res.status(400).json({ message: "Invalid master type." });
    }

    // Fetch the values for the corresponding table
    const values = await model.findMany();
    res.status(200).json(values);
  } catch (error) {
    console.error("Error fetching values:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addMasterValue, getMasterValues };
