const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'secret-folder');

fs.readdir(src, { withFileTypes: true }, (err, arr) => {
  arr.forEach(file => {
    fs.stat(`${src}/${file.name}`, (err, element) => {
      if (element.isFile()) console.log(`${file.name.split('.').join(' - ')} - ${element.size / 1000}kb`);
    });
  });
});