const fsPromises = require('fs/promises'),
  fs = require('fs'),
  path = require('path');

let options = { encoding: 'utf-8', withFileTypes: true };

let dirFrom = path.join(__dirname, 'assets'),
  dirResult = path.join(__dirname, 'project-dist'),
  dirComponents = path.join(__dirname, 'components');

const writeableStream = fs.createWriteStream(
  path.join(dirResult, 'style.css')
);

async function createdDir() {
  try {
    await fsPromises.mkdir(dirResult, { recursive: true });
    console.log('The "project-dist" directory has been created!');
  } catch (error) {
    console.log('Ouch!');
    throw error;
  }
}

async function createHtml(){
  try {
    const readableStreamHtml = fs.createReadStream(
        path.join(__dirname, 'template.html'),
        options.encoding
      ),
      writeableStreamHtml = fs.createWriteStream(
        path.join(dirResult, 'index.html'),
        options.encoding
      );
    let result = '';

    const elements = await fsPromises.readdir(dirComponents, options);
    elements.forEach((element, index) => {
      const readableStreamElement = fs.createReadStream(
        path.join(dirComponents, element.name),
        options.encoding
      );
      let sample = path.basename(element.name, path.extname(element.name));

      readableStreamHtml.on('data', chunk => {
        result = chunk;
        readableStreamElement.on('data', data => {
          result = result.replace(`{{${sample}}}`, data);
          if(index === elements.length - 1)
            writeableStreamHtml.write(result);
        });
      });
    });
    console.log('File "index.html" created!');
  } catch (error) {
    console.log('Ouch!');
    throw error;
  }
}

async function copyDirAssets(src, dist) {
  try {
    const items = await fsPromises.readdir(src, options);

    for (let item of items) {
      if (item.isDirectory()) {
        const secondSrc = path.join(src, item.name),
          secondDist = path.join(dist, item.name);
        copyDirAssets(secondSrc, secondDist);
      } else {
        await fsPromises.mkdir(dist, { recursive: true });
        await fsPromises.copyFile(
          path.join(src, item.name),
          path.join(dist, item.name)
        );
      }
    }
  } catch (error) {
    console.log('Ouch!');
    throw error;
  }
}

async function mergeStyles() {
  try {
    const files = await fsPromises.readdir(
      path.join(__dirname, 'styles'),
      options
    );
    files.map((file) => {
      if (path.extname(file.name) === '.css' && file.isFile()) {
        let readableStream = fs.createReadStream(
          path.join(__dirname, 'styles', file.name),
          options.encoding
        );
        readableStream.pipe(writeableStream);
      }
    });
    console.log('Files fo extension "css" merged. Created file style.css!');
  } catch (error) {
    console.log('Ouch!');
    throw error;
  }
}

createdDir();
createHtml();
mergeStyles();
copyDirAssets(dirFrom, path.join(dirResult, 'assets'));