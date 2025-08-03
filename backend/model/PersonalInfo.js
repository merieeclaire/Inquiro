const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userEmail: String,
  fullName: String,
  age: Number,
  gender: String,
  address: String
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
