import fs from 'fs';

const removeExtraSpacesFromFile = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const cleanedData = data.replace(/\s+/g, ' ').trim();
        fs.writeFile(filePath, cleanedData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File cleaned successfully.');
        });
    })
}


const filePath = new URL('./1-file-cleaner.txt', import.meta.url);
removeExtraSpacesFromFile(filePath);