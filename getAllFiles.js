const fs = require('fs');
const path = require('path');

// Read SVG files from the specified directory
const files = fs.readdirSync('./public/assets/svg');

// Transform file names to uppercase and create objects
const fileNames = files.map((file) => {
  return {
    name: file.replace('.svg', '').toUpperCase(),
    flag: `/assets/${file}`
  };
});

// Convert the array of objects to a JSON string
const jsonData = JSON.stringify(fileNames, null, 2);

// Write the JSON data to a file
fs.writeFile('./countries.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('Data successfully written to countries.json');
  }
});