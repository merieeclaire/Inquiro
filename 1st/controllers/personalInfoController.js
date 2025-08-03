const PersonalInfo = require('../model/PersonalInfo');

// Create
const createPersonalInfo = async (req, res) => {
  try {
    const info = await PersonalInfo.create(req.body);
    res.status(201).json(info);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read All
const getAllPersonalInfo = async (req, res) => {
  const data = await PersonalInfo.find();
  res.json(data);
};

// Read by ID
const getPersonalInfoById = async (req, res) => {
  try {
    const data = await PersonalInfo.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updatePersonalInfo = async (req, res) => {
  try {
    const updated = await PersonalInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
const deletePersonalInfo = async (req, res) => {
  try {
    await PersonalInfo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPersonalInfo,
  getAllPersonalInfo,
  getPersonalInfoById,
  updatePersonalInfo,
  deletePersonalInfo
};
