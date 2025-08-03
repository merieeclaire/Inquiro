const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  contact: { type: String },
  about: { type: String, required: true }
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
