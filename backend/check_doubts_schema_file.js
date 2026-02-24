const db = require('./src/db');
const fs = require('fs');
const outFile = 'schema_result.txt';

function log(msg) {
    try {
        fs.appendFileSync(outFile, msg + '\n');
    } catch (e) { }
}

async function checkDoubtsSchema() {
    try {
        fs.writeFileSync(outFile, 'Checking columns for "doubts" table...\n');
        const res = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'doubts';
        `);

        if (res.rows.length === 0) {
            log('Table "doubts" does not exist or has no columns.');
        } else {
            log('Columns in "doubts" table:');
            res.rows.forEach(row => {
                log(`- ${row.column_name} (${row.data_type})`);
            });
        }
    } catch (err) {
        log('Error checking schema: ' + err.message);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

checkDoubtsSchema();
