const mongoose = require('mongoose');

const schoolInfoSchema = new mongoose.Schema({
  userEmail: String,
  schoolName: String,
  gradeLevel: String,
  honors: String
});

module.exports = mongoose.model('SchoolInfo', schoolInfoSchema);
