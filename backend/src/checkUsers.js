const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env from parent directory
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function checkUsers() {
    try {
        const res = await pool.query('SELECT id, email, username FROM users');
        const output = 'Users found:\n' + JSON.stringify(res.rows, null, 2);
        fs.writeFileSync(path.join(__dirname, 'users_dump.txt'), output);
        console.log('Output written to users_dump.txt');
    } catch (err) {
        const errorMsg = 'Error querying users: ' + err.toString();
        fs.writeFileSync(path.join(__dirname, 'users_dump.txt'), errorMsg);
        console.error(errorMsg);
    } finally {
        await pool.end();
    }
}

checkUsers();
