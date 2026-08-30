import fs from 'fs';

function readFile(filePath) {
    console.log('Reading file...');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return
        }
        console.log(data);
    })
}



const filePath = new URL('./file.txt', import.meta.url);
readFile(filePath);

let a = 0;
for (let i = 0; i < 10000000000; i++) {
    a++;
}
console.log(a);