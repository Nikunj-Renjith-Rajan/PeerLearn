const { Pool } = require('pg');
const dotenv = require('dotenv');

// Ensure dotenv is configured before using env vars
dotenv.config();

const dbConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'peerlearn',
    password: process.env.DB_PASSWORD || '1234',
    port: parseInt(process.env.DB_PORT || '5432'),
};

const pool = new Pool({
    ...dbConfig,
    connectionTimeoutMillis: 5000, // Reduced from default
});

// Test the connection logic
pool.on('connect', () => {
    // console.log('Connected to the database'); 
    // Excessive logging can be noisy, but good for debugging initially
});

// Log config for debug
console.log('DB Config:', { ...dbConfig, password: '****' });

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool, // Export pool if raw access is needed
};
