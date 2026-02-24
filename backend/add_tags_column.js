const db = require('./src/db');
const fs = require('fs');
const logFile = 'migration_tags_log.txt';

function log(msg) {
    console.log(msg);
    try {
        fs.appendFileSync(logFile, msg + '\n');
    } catch (e) { }
}

async function migrate() {
    try {
        fs.writeFileSync(logFile, 'Starting migration for tags...\n');

        log('Adding "tags" column if not exists...');
        // Using TEXT[] for tags array
        await db.query('ALTER TABLE doubts ADD COLUMN IF NOT EXISTS tags TEXT[];');
        log('"tags" column added or already exists.');

        log('Migration completed successfully.');
    } catch (err) {
        log('Migration failed: ' + err.message);
        log(err.stack);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

migrate();
