const fs = require('fs');
console.log('Starting simple fs test');
try {
    fs.writeFileSync('simple_test.txt', 'Hello World');
    console.log('File written');
} catch (e) {
    console.error(e);
}
