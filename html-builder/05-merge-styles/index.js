const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'styles');
const srcDist = path.join(__dirname, 'project-dist');

fs.readdir(src, (err, arr) => {
  arr.forEach(item => {
    if (item.split('.')[1] === 'css') {
      let stream = fs.createReadStream(`${src}/${item}`, 'utf-8');
      stream.on('data', (element) => {fs.appendFile(`${srcDist}/bundle.css`, element, () => console.log(`${item} - merged`));});
    }
  });
});