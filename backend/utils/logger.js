const fs = require('fs');
const path = require('path');

// file parh for logs
const logFile = path.join(__dirname, '../logs.txt');

const logToken = (type, token) => {
  const now = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
  const logEntry = `[${now}] ${type}: ${token}\n`;

  // writes token and timestamps
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

module.exports = logToken;
