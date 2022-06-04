const fs = require('fs');
const path = require('path');

let src = path.join(__dirname, 'text.txt');
let readStream = fs.createReadStream(src, 'utf-8');

readStream.on('data', (e) => console.log(e));