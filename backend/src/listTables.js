const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function listTables() {
    try {
        console.log('Connecting to database...');
        console.log(`Host: ${process.env.DB_HOST}`);
        console.log(`Port: ${process.env.DB_PORT}`);
        console.log(`Database: ${process.env.DB_NAME}`);
        console.log(`User: ${process.env.DB_USER}`);

        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);

        if (result.rows.length === 0) {
            console.log('Connected successfully! No tables found in the database.');
        } else {
            console.log('Connected successfully! Found the following tables:');
            result.rows.forEach(row => {
                console.log(`- ${row.table_name}`);
            });
        }
    } catch (err) {
        console.error('Error connecting to database:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.error('Make sure your PostgreSQL server is running on the specified port.');
        }
    } finally {
        await pool.end();
    }
}

listTables();
