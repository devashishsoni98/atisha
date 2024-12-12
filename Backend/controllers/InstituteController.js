const { PrismaClient } = require('@prisma/client');
const {createNotification} = require("../services/pushNotificationServieces");
const prisma = new PrismaClient();

// API to fetch Institute Name and Code
const fetchInstituteNameCode = async (req, res) => {
    try {
      // Fetch the school_name and institute_code from the database
      const institutes = await prisma.institute_info.findMany({
        select: {
          name: true, // Assuming 'name' is your school_name
          institute_code: true,
        },
      });
  
      // Map the result into an array of objects
      const formattedData = institutes.map((institute) => ({
        school_name: institute.name,
        institute_code: institute.institute_code,
      }));
  
      // Return the formatted data
      return res.status(200).json({
        success: true,
        data: formattedData,
      });
    } catch (error) {
      console.error('Error fetching institute data:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching institute data.',
      });
    }
  };

// Function to generate a unique institute code
async function generateInstituteCode() {
    const prefix = "INST";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";

    // Generate a 6-character random suffix
    for (let i = 0; i < 6; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const instituteCode = prefix + randomCode;

    // Check if the generated code is unique
    const existingCode = await prisma.institute_info.findUnique({
        where: { institute_code: instituteCode }
    });

    // If not unique, regenerate recursively
    if (existingCode) {
        return generateInstituteCode();
    }

    return instituteCode;
}

// Create or update institute info and SPOC information
const createOrUpdateInstitute = async (req, res) => {
    const {
        user_id,
        name,
        image_url,
        plot_no,
        street,
        city,
        state,
        contact_number,
        establish_year,
        institute_type,
        student_body,
        institute_board,
        spoc_name,
        spoc_email,
        spoc_contact_number
    } = req.body;

    if (!user_id || !plot_no || !street || !city || !state || !contact_number || !establish_year || !institute_type || !student_body || !institute_board) {
        return res.status(400).json({ message: "All institute fields are required." });
    }

    if (!spoc_name || !spoc_email || !spoc_contact_number) {
        return res.status(400).json({ message: "All SPOC fields are required." });
    }

    try {
        // Check if the institute already exists
        const existingInstitute = await prisma.institute_info.findUnique({
            where: { user_id: user_id }
        });

        let instituteCode = existingInstitute?.institute_code;

        // Generate a new code only if it's a new institute
        if (!existingInstitute) {
            instituteCode = await generateInstituteCode();
        }

        // Create or update institute info
        const instituteInfo = await prisma.institute_info.upsert({
            where: { user_id: user_id },
            update: {
                image_url,
                name,
                plot_no,
                street,
                city,
                state,
                contact_number,
                establish_year,
                institute_type,
                student_body,
                institute_board,
            },
            create: {
                user_id,
                name,
                image_url,
                plot_no,
                street,
                city,
                state,
                contact_number,
                establish_year,
                institute_type,
                student_body,
                institute_board,
                institute_code: instituteCode, // Store the generated code
            },
        });

        // Handle SPOC creation or update
        const existingSpoc = await prisma.institute_spoc.findFirst({
            where: { user_id }
        });

        let spocInfo;

        if (existingSpoc) {
            spocInfo = await prisma.institute_spoc.update({
                where: { id: existingSpoc.id },
                data: {
                    name: spoc_name,
                    email: spoc_email,
                    contact_number: spoc_contact_number
                }
            });
        } else {
            spocInfo = await prisma.institute_spoc.create({
                data: {
                    user_id,
                    name: spoc_name,
                    email: spoc_email,
                    contact_number: spoc_contact_number
                }
            });
        }

        await createNotification(`New institute registered. Name: ${instituteInfo?.name}`);
        res.status(201).json({
            message: "Institute and SPOC information created/updated successfully",
            instituteInfo,
            spocInfo
        });
    } catch (error) {
        console.error("Error while creating/updating institute and SPOC information:", error);
        res.status(500).json({ message: "Error while creating/updating institute and SPOC information." });
    }
};

// Get institute by ID along with SPOCs
const getInstituteById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Institute ID is required." });
    }

    try {
        const institute = await prisma.institute_info.findUnique({
            where: { user_id: parseInt(id) },
            include: {
                user: true, // Include related user data if neede
            },
        });

        const spocs = await prisma.institute_spoc.findMany({
            where: { user_id: parseInt(id) },
        });

        if (!institute) {
            return res.status(404).json({ message: "Institute not found." });
        }

        res.status(200).json({"institute":institute,"spocs":spocs});
    } catch (error) {
        console.error("Error while fetching institute:", error);
        res.status(500).json({ message: "Error while fetching institute." });
    }
};

module.exports = {
    createOrUpdateInstitute, // Export the merged function
    getInstituteById,
    fetchInstituteNameCode,
};