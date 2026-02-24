const db = require('./src/db');
const fs = require('fs');
const logFile = 'migration_instructor_log.txt';

function log(msg) {
    console.log(msg);
    try {
        fs.appendFileSync(logFile, msg + '\n');
    } catch (e) { }
}

async function migrate() {
    try {
        fs.writeFileSync(logFile, 'Starting migration for instructor_id...\n');

        log('Adding "instructor_id" column if not exists...');
        await db.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_id INTEGER REFERENCES users(id);');
        log('"instructor_id" column added or already exists.');

        log('Migration completed successfully.');
    } catch (err) {
        log('Migration failed: ' + err.message);
        log(err.stack);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

migrate();
