const db = require('./src/db');
const fs = require('fs');
const logFile = 'migration_log.txt';

function log(msg) {
    console.log(msg);
    try {
        fs.appendFileSync(logFile, msg + '\n');
    } catch (e) { }
}

async function migrate() {
    try {
        fs.writeFileSync(logFile, 'Starting migration...\n');

        log('Adding "price" column if not exists...');
        await db.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00;');
        log('"price" column added or already exists.');

        log('Adding "category" column if not exists...');
        await db.query('ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(255);');
        log('"category" column added or already exists.');

        log('Migration completed successfully.');
    } catch (err) {
        log('Migration failed: ' + err.message);
        log(err.stack);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

migrate();
