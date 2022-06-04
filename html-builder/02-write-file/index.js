const fs = require('fs');
const path = require('path');
const process = require('process');
const src = path.join(__dirname, 'EnterPassword.txt');

const writeStream = fs.createWriteStream(src);

console.log('Enter password');

process.stdin.pipe(writeStream);
process.stdin.resume();

function exit() {
  console.log('Explosion 3..2..1..');
  process.exit();
}

process.on('SIGINT', exit);

process.stdin.on('data', data => {
  let leave = data.toString().trim();
  if (leave === 'exit') exit();
});