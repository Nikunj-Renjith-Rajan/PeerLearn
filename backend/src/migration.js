const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function migrate() {
    try {
        console.log('Running migration...');
        // Add tags column to doubts if not exists
        await pool.query('ALTER TABLE doubts ADD COLUMN IF NOT EXISTS tags TEXT[]');

        // Add votes column
        await pool.query('ALTER TABLE doubts ADD COLUMN IF NOT EXISTS votes INTEGER DEFAULT 0');

        // Create answers table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS answers (
        id SERIAL PRIMARY KEY,
        doubt_id INTEGER REFERENCES doubts(id),
        user_id INTEGER REFERENCES users(id),
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Migration completed.');
    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        await pool.end();
    }
}

migrate();
