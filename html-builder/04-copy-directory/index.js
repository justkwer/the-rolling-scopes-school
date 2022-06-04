
const fs = require('fs');
const path = require('path');

const files = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy/');

fs.mkdir(filesCopy,{recursive: true}, err => {if (err) throw err;});

fs.readdir(filesCopy, {withFileTypes: true},(err,files)=> {
  if (err) throw err;
  files.forEach((element) => {fs.unlink(filesCopy+ `${element.name}`, err => {if (err) throw err;});});
});

fs.readdir(files, {withFileTypes: true},(err,files)=> {
  if (err) throw err;
  files.forEach((element) => {
    const files = path.join(__dirname, 'files/');
    fs.copyFile(files + `${element.name}`, filesCopy + `${element.name}`, err => {
      if (err) throw err;
      console.log(`${element.name} - copied`);
    });
  });
});
