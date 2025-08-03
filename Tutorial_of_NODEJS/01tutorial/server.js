// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) Console is the terminal window
console.log('hello world!')

// 3) global object instead of window object
//console.log(global);

// 4) has common core modules that we will explore
// 5) common JS modules instread of ES6 modules
// 6) missing some JS APIs like fetch

const os = require('os')
const path = require('path')
const { add, subtract, multiply, divide } = require('./math')

console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(divide(2,3))

/*
console.log(os.type()) //windows_NT
console.log(os.version()) //windows 11 Home Single Language
console.log(os.homedir()) // c:\Users\Merie Claire

console.log(__dirname) // C:\OJT Inquiro
console.log(__filename) // C:\OJT Inquiro\server.js

console.log(path.dirname(__filename)) //C:\OJT Inquiro
console.log(path.basename(__filename)) //server.js
console.log(path.extname(__filename)) //.js

// you will get the root, dir, base ext, and the name
console.log(path.parse(__filename))
*/
