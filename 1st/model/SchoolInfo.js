const mongoose = require('mongoose');

const schoolInfoSchema = new mongoose.Schema({
  elementary: String,
  highSchool: String
});

module.exports = mongoose.model('SchoolInfo', schoolInfoSchema);
