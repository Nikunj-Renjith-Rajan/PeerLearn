const db = require('./src/db');

async function checkDoubtsSchema() {
    try {
        console.log('Checking columns for "doubts" table...');
        const res = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'doubts';
        `);

        if (res.rows.length === 0) {
            console.log('Table "doubts" does not exist or has no columns.');
        } else {
            console.log('Columns in "doubts" table:');
            res.rows.forEach(row => {
                console.log(`- ${row.column_name} (${row.data_type})`);
            });
        }
    } catch (err) {
        console.error('Error checking schema:', err);
    } finally {
        // Allow time for logs to flush if needed, though console.log is sync usually
        setTimeout(() => process.exit(0), 1000);
    }
}

checkDoubtsSchema();
