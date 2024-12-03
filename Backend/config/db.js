const { Client } = require('pg');
require('dotenv').config(); // Load environment variables

const con = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD || 'lavi204',
    database: process.env.DB_NAME || 'atisha_db',
});

con.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err.stack));

module.exports = con;
