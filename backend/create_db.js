const fs = require('fs');
const { Client } = require('pg');
const dotenv = require('dotenv');

function log(msg) {
    const message = `${new Date().toISOString()} - ${msg}\n`;
    console.log(msg);
    fs.appendFileSync('db_debug.log', message);
}

log('Script started...');
dotenv.config();

log('Configuring client...');
const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: '127.0.0.1', // Force IPv4
    password: process.env.DB_PASSWORD || '1234',
    port: process.env.DB_PORT || 6000,
    database: 'postgres', // Connect to default database first
    connectionTimeoutMillis: 5000 // 5 second timeout
});

async function createDatabase() {
    try {
        log('Attempting to connect to postgres database at 127.0.0.1:6000...');
        await client.connect();
        log('Connected to default database');

        // Check if database exists
        const checkRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'peerlearn'");
        if (checkRes.rowCount === 0) {
            log('Creating database peerlearn...');
            await client.query('CREATE DATABASE peerlearn');
            log('Database peerlearn created successfully');
        } else {
            log('Database peerlearn already exists');
        }
    } catch (err) {
        log(`Error creating database: ${err.message}`);
        if (err.message.includes('does not exist')) {
            log('Trying to connect to template1...');
            // Logic to retry with template1 could go here, but for now just fail with info
        }
    } finally {
        await client.end();
        log('Script finished.');
    }
}

createDatabase();
