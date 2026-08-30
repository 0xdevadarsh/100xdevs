import fs from 'fs';

const content = 'Appending content to the file via 4-write-to-file.js\n';
const filePath = new URL('./file.txt', import.meta.url);

fs.appendFile(filePath, content, 'utf8', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log('File appended successfully!');
});
