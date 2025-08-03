
const fs = require('fs');


//trying to figure there is already an existing folder to not overwrite it
if (!fs.existsSync('./new')) {

  //creating new folder
  fs.mkdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
} 

//deleting the new directory
if (!fs.existsSync('./new')) {
  // If folder exists — delete it
  fs.rmdir('./new', (err) => {
    if (err) throw err;
    console.log('Directory removed');
  });
}