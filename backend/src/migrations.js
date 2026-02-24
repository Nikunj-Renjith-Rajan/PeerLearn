const db = require('./db');
const fs = require('fs');

async function runMigrations() {
    console.log('Running database migrations...');
    try {
        // 1. Add price, category, instructor_id to courses
        await db.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00;`);
        await db.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(255);`);
        await db.query(`ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_id INTEGER REFERENCES users(id);`);

        // 2. Add tags to doubts
        await db.query(`ALTER TABLE doubts ADD COLUMN IF NOT EXISTS tags TEXT[];`);

        // 3. Add votes to doubts (if likely missing)
        await db.query(`ALTER TABLE doubts ADD COLUMN IF NOT EXISTS votes INTEGER DEFAULT 0;`);

        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
        // Don't exit process, let server try to run anyway, but log error
    }
}

module.exports = runMigrations;
