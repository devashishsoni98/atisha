const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    // Validate required fields for institute info
    if (!user_id || !plot_no || !street || !city || !state || !contact_number || !establish_year || !institute_type || !student_body || !institute_board) {
        return res.status(400).json({ message: "All institute fields are required." });
    }

    // Validate required fields for SPOC info
    if (!spoc_name || !spoc_email || !spoc_contact_number) {
        return res.status(400).json({ message: "All SPOC fields are required." });
    }

    try {
        // Create or update institute info
        const instituteInfo = await prisma.institute_info.upsert({
            where: { user_id: user_id },
            update: {
                image_url: image_url,
                name: name,
                plot_no: plot_no,
                street: street,
                city: city,
                state: state,
                contact_number: contact_number,
                establish_year: establish_year,
                institute_type: institute_type,
                student_body: student_body,
                institute_board: institute_board,
            },
            create: {
                user_id: user_id,
                name: name,
                image_url: image_url,
                plot_no: plot_no,
                street: street,
                city: city,
                state: state,
                contact_number: contact_number,
                establish_year: establish_year,
                institute_type: institute_type,
                student_body: student_body,
                institute_board: institute_board,
            },
        });

        // Check if SPOC already exists for this user_id
        const existingSpoc = await prisma.institute_spoc.findFirst({
            where: { user_id } // Find first SPOC associated with this user_id
        });

        let spocInfo;

        if (existingSpoc) {
            // Update existing SPOC information
            spocInfo = await prisma.institute_spoc.update({
                where: { id: existingSpoc.id }, // Use the found SPOC's ID
                data: {
                    name: spoc_name,
                    email: spoc_email,
                    contact_number: spoc_contact_number
                }
            });
        } else {
            // Create new SPOC information
            spocInfo = await prisma.institute_spoc.create({
                data: {
                    user_id, // Associate with the same user_id as the institute
                    name: spoc_name,
                    email: spoc_email,
                    contact_number: spoc_contact_number
                }
            });
        }

        res.status(201).json({
            message: "Institute and SPOC information created/updated successfully",
            instituteInfo: instituteInfo,
            spocInfo: spocInfo
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
                user: true, // Include related user data if needed
                spocs: true, // Include related SPOCs
            },
        });

        if (!institute) {
            return res.status(404).json({ message: "Institute not found." });
        }

        res.status(200).json(institute);
    } catch (error) {
        console.error("Error while fetching institute:", error);
        res.status(500).json({ message: "Error while fetching institute." });
    }
};

module.exports = {
    createOrUpdateInstitute, // Export the merged function
    getInstituteById,
};