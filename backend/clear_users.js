const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function clearUsers() {
    try {
        console.log('Clearing users table...');
        // Using TRUNCATE with CASCADE to clear dependent tables like doubts if necessary
        // Adjust dependent tables based on schema
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
        console.log('Users table cleared successfully.');
    } catch (err) {
        console.error('Error clearing users table:', err);
    } finally {
        await pool.end();
    }
}

clearUsers();
