const fs = require('fs');
const logFile = 'db_test_result.txt';

function log(msg) {
    // console.log(msg);
    try {
        fs.appendFileSync(logFile, msg + '\n');
    } catch (e) {
        // failed to write log
    }
}

// Clear log file
try {
    fs.writeFileSync(logFile, 'Starting test script...\n');
} catch (e) { }

let db;
try {
    log('Requiring db module...');
    db = require('./src/db');
    log('db module required successfully.');
} catch (e) {
    log('Error requiring db module: ' + e.message);
    log(e.stack);
    process.exit(1);
}

async function testConnectionAndInsert() {
    try {
        fs.writeFileSync(logFile, 'Starting test...\n');
        log('Testing database connection...');
        const res = await db.query('SELECT NOW()');
        log('Database connected at: ' + res.rows[0].now);

        log('Testing course insertion...');
        // Mock data
        const title = 'Test Course ' + Date.now();
        const description = 'Test Description';
        const price = 99.99;
        const category = 'Development';
        // We need a valid instructor_id. Let's pick the first user.
        const userRes = await db.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length === 0) {
            log('No users found to assign as instructor.');
            return;
        }
        const instructor_id = userRes.rows[0].id;

        const courseRes = await db.query(
            'INSERT INTO courses (title, description, price, category, instructor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, price, category, instructor_id]
        );
        log('Course inserted successfully: ' + JSON.stringify(courseRes.rows[0]));

        // Cleanup
        await db.query('DELETE FROM courses WHERE id = $1', [courseRes.rows[0].id]);
        log('Test course deleted.');

    } catch (err) {
        log('Test failed: ' + err.message);
        log(err.stack);
    } finally {
        // process.exit(0); // Pool keeps event loop open
        setTimeout(() => process.exit(0), 1000);
    }
}

testConnectionAndInsert();
