const mongoose = require('mongoose');

const collegeInfoSchema = new mongoose.Schema({
  college: String,
  course: String,
  yearGraduated: Number
});

module.exports = mongoose.model('CollegeInfo', collegeInfoSchema);
