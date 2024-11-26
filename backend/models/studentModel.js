// models/studentModel.js
const con = require('../config/db');

// Create or update student personal info
const createOrUpdateStudentPersonalInfo = async (userId, image, dob, gender, location, contactNumber) => {
    const query = `
        INSERT INTO student_personal_info (user_id, image, dob, gender, location, contact_number)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id)
        DO UPDATE SET image = $2, dob = $3, gender = $4, location = $5, contact_number = $6
        RETURNING *;
    `;
    const result = await con.query(query, [userId, image, dob, gender, location, contactNumber]);
    return result.rows[0];
};

// Create or update student education info
const createOrUpdateStudentEducation = async (userId, schoolName, classLevel) => {
    const query = `
        INSERT INTO student_education (user_id, school_name, class)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET school_name = $2, class = $3
        RETURNING *;
    `;
    const result = await con.query(query, [userId, schoolName, classLevel]);
    return result.rows[0];
};

// Create or update student interests (subjects, sports, hobbies)
const createOrUpdateStudentInterests = async (userId, subjectIds, sportIds, hobbyIds) => {
    const query = `
        INSERT INTO student_interest (user_id, subject_ids, sport_ids, hobby_ids)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET subject_ids = $2, sport_ids = $3, hobby_ids = $4
        RETURNING *;
    `;
    const result = await con.query(query, [userId, subjectIds, sportIds, hobbyIds]);
    return result.rows[0];
};

module.exports = {
    createOrUpdateStudentPersonalInfo,
    createOrUpdateStudentEducation,
    createOrUpdateStudentInterests,
};
