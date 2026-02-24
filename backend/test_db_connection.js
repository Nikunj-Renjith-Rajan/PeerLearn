const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => {
        console.log('Connected successfully to port ' + process.env.DB_PORT);
        return client.end();
    })
    .catch(err => {
        console.error('Connection failed:', err);
    });
