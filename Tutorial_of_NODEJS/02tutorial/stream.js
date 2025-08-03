const fs = require('fs');

const rs = fs.createReadStream('./02tutorial/lorem.txt',{encoding: 'utf8'})

const ws = fs.createWriteStream('./02tutorial/new-lorem.txt');


/*
//for listening
rs.on('data', (dataChunk) => {
  ws.write(dataChunk);
})
*/

rs.pipe(ws);