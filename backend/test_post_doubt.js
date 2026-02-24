const db = require('./src/db');
const fs = require('fs');
const logFile = 'doubt_test_result.txt';

function log(msg) {
    console.log(msg);
    try {
        fs.appendFileSync(logFile, msg + '\n');
    } catch (e) { }
}

async function testPostDoubt() {
    try {
        fs.writeFileSync(logFile, 'Starting doubt post test...\n');

        // Simulate a user (you might need a valid user ID, assuming 1 exists or picking one)
        // If no user exists, this might fail on foreign key constraint.
        // Let's try to get a user first.
        const userRes = await db.query('SELECT id FROM users LIMIT 1');
        if (userRes.rows.length === 0) {
            log('No users found. Creating a dummy user for testing.');
            const newUser = await db.query("INSERT INTO users (name, email, password) VALUES ('Test User', 'test@example.com', 'password') RETURNING id");
            var userId = newUser.rows[0].id;
        } else {
            var userId = userRes.rows[0].id;
        }

        const title = 'Test Doubt Title';
        const description = 'Test Doubt Description';
        const tags = ['react', 'test'];

        log(`Posting doubt for user ${userId}...`);
        const res = await db.query(
            'INSERT INTO doubts (user_id, title, description, tags) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, title, description, tags]
        );

        log('Doubt posted successfully:');
        log(JSON.stringify(res.rows[0], null, 2));

    } catch (err) {
        log('Doubt post failed: ' + err.message);
        log(err.stack);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

testPostDoubt();
