const mongoose = require('mongoose');

const collegeInfoSchema = new mongoose.Schema({
  userEmail: String,
  course: String,
  yearLevel: String,
  achievements: String
});

module.exports = mongoose.model('CollegeInfo', collegeInfoSchema);
