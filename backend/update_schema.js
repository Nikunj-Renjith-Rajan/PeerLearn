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

async function updateSchema() {
    try {
        console.log('Updating courses table schema...');

        // Add price column if not exists
        await pool.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00');
        console.log('Added price column.');

        // Add category column if not exists
        await pool.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(255)');
        console.log('Added category column.');

        // Add instructor_id column if not exists
        await pool.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_id INTEGER REFERENCES users(id)');
        console.log('Added instructor_id column.');

        console.log('Schema update completed successfully.');
    } catch (err) {
        console.error('Error updating schema:', err);
    } finally {
        await pool.end();
    }
}

updateSchema();
