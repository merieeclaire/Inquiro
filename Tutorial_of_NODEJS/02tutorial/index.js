
//const fs = require('fs');
const fsPromises  = require('fs').promises;
const path = require('path');

const fileOps =async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'starter.txt'), 'utf8');
        console.log(data);

        //deleting the original file starter.txt
        await fsPromises.unlink(path.join(__dirname, 'starter.txt'));

        //writing a file, appending and renaming a file
        await fsPromises.writeFile(path.join(__dirname, 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'promiseWrite.txt'), '\n\nNice to meet you!');
        await fsPromises.rename(path.join(__dirname, 'promiseWrite.txt'), path.join(__dirname, 'promiseComplete.txt'));

        //reading the new data and logging it
        const newData = await fsPromises.readFile(path.join(__dirname, 'promiseComplete.txt'), 'utf8');
        console.log(newData);

    } catch (err) {
        console.error(err)
    }
}

fileOps();




/*
fs.readFile('./02tutorial/starter.txt', 'utf8', (err, data) => {
    if (err) throw err;
    noconsole.log(data); // pure data only
    // console.log(data.toString()); // if there is a string that needs to be convert
})


fs.readFile(path.join(__dirname, 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // pure data only
});

*/

// even if there is a readFile ahead of this, it will still prints this one first
//console.log('Hello...');


/*
//write
fs.writeFile(path.join (__dirname, 'reply.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write Complete');
})


//appeding files
fs.appendFile(path.join (__dirname, 'test.txt'), 'Testing Text', (err) => {
    if (err) throw err;
    console.log('Append Complete');
})



// OR
fs.writeFile(path.join (__dirname, 'reply2.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write Complete');

    fs.appendFile(path.join (__dirname, 'reply2.txt'), '\n\nYes it is!!!', (err) => {
    if (err) throw err;
    console.log('Append Complete');
    })

})
*/


/*
// OR
// it has  a call back hell
fs.writeFile(path.join (__dirname, 'reply2.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write Complete');

    fs.appendFile(path.join (__dirname, 'reply2.txt'), '\n\nYes it is!!!', (err) => {
    if (err) throw err;
    console.log('Append Complete');

        //moving the reply2 into a new txt file which is NewReply
        fs.rename(path.join (__dirname, 'reply2.txt'), path.join(__dirname,'NewReply.txt'), (err) => {
        if (err) throw err;
        console.log('Rename Complete');
        })

    })

})
*/



// Exit on uncaught errors
// if it can't find the file or if it doesn't exist
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})



