const studentModel = require('../models/studentModel');

exports.createOrUpdateStudentProfile = async (profileData) => {
  try {
    console.log('Received profile data:', JSON.stringify(profileData, null, 2));

    const { userId, image, dob, gender, location, contactNumber, schoolName, classLevel, subjectIds, sportIds, hobbyIds } = profileData;

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Create or update personal info
    const personalInfo = await studentModel.createOrUpdateStudentPersonalInfo(userId, image, dob, gender, location, contactNumber);

    // Create or update education info
    const educationInfo = await studentModel.createOrUpdateStudentEducation(userId, schoolName, classLevel);

    // Create or update interests
    const interestsInfo = await studentModel.createOrUpdateStudentInterests(userId, subjectIds, sportIds, hobbyIds);

    console.log('Student profile saved successfully');
    return { personalInfo, educationInfo, interestsInfo };
  } catch (error) {
    console.error('Error in createOrUpdateStudentProfile:', error);
    throw new Error(`Error while creating/updating student profile: ${error.message}`);
  }
};