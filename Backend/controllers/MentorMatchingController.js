const axios = require('axios');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


// const getMentorMatching = async (req, res) => {
//     try {
//         const { id } = await req.params;
//         console.log("id", id);
//
//         try {
//             const recommandations = await axios.get(`http://localhost:7000/quiz/match_mentor?user_id=${id}`);
//
//             const recommandedMentors = await recommandations.data;
//             console.log("recommandedMentors:", recommandedMentors);
//
//             const response = await prisma.mentors.findMany(
//                 {
//                     where: {
//                         id: {
//                             in: recommandedMentors.map(mentor => mentor.id)
//                         }
//                     },
//                     include: {
//                         user: true,
//                         mentor_professional: true,
//                         mentor_education: true,
//                     }
//                 }
//             );
//             console.log("response:", response);
//             res.status(200).json(response);
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({error: 'Error to fetch mentors'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'Error to fetch recommandations'});
//     }
//
// }

const getMentorMatching = async (req, res) => {
    const { id } = req.params; // Destructure user ID from request parameters
    console.log("User ID:", id);

    try {
        // Fetch mentor recommendations based on user ID
        const recommandationsPromise = await axios.get(`http://localhost:7000/quiz/match_mentor?user_id=${id}`);

        // Wait for the recommendations and process them
        const { data: recommandedMentors } = await recommandationsPromise;
        console.log("Recommended Mentors:", recommandedMentors);

        // Check if any mentors were recommended
        if (!recommandedMentors || recommandedMentors.length === 0) {
            return res.status(404).json({ error: 'No recommended mentors found' });
        }

        // Fetch mentor details from the database using Promise.all
        const mentorIds = await recommandedMentors.matches.map(mentor => mentor.mentor_id);
        console.log("Mentor IDs:", mentorIds);
        const mentorsPromise = prisma.mentors.findMany({
            where: {
                user_id : {
                    in: mentorIds
                }
            },
            include: {
                user: true,
                mentor_professional: true,
                mentor_education: true,
            }
        });

        // Wait for both promises to resolve
        const [recommandations, mentors] = await Promise.all([recommandationsPromise, mentorsPromise]);

        console.log("Mentor Details Response:", mentors);
        res.status(200).json(mentors);
    } catch (error) {
        console.error("Error:", error); // More descriptive error logging
        res.status(500).json({ error: 'An error occurred while fetching mentors' });
    }
};


module.exports ={
    getMentorMatching,
}