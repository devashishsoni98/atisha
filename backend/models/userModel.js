//userModel.js
const con = require('../config/db');

// Fetch role by account type
const getRoleByAccountType = async (accountType) => {
    const roleQuery = 'SELECT id FROM roles WHERE LOWER(role_name::text) = LOWER($1)';
    const roleResult = await con.query(roleQuery, [accountType]);
    return roleResult.rows[0];
};

// Create a new user
const createUser = async (fullName, email, hashedPassword, roleId) => {
    const userQuery = `
        INSERT INTO users (name, email, password, role_id) 
        VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const userResult = await con.query(userQuery, [fullName, email, hashedPassword, roleId]);
    return userResult.rows[0];
};

// Fetch user by email
const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await con.query(query, [email]);
    return result.rows[0]; // Return the user object
};

module.exports = {
    getRoleByAccountType,
    createUser,
    getUserByEmail,
};
