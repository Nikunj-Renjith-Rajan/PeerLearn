const db = require('./src/db');

async function checkColumns() {
    try {
        console.log('Checking columns for "courses" table...');
        const res = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'courses';
        `);

        console.log('Columns found:');
        res.rows.forEach(row => {
            console.log(`- ${row.column_name} (${row.data_type})`);
        });

        const columns = res.rows.map(r => r.column_name);
        const hasPrice = columns.includes('price');
        const hasCategory = columns.includes('category');

        console.log('---');
        console.log(`Has price: ${hasPrice}`);
        console.log(`Has category: ${hasCategory}`);

    } catch (err) {
        console.error('Error checking columns:', err);
    } finally {
        setTimeout(() => process.exit(0), 1000);
    }
}

checkColumns();
