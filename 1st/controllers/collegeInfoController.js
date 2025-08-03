const CollegeInfo = require('../model/CollegeInfo');

// Create
const createCollegeInfo = async (req, res) => {
  try {
    const info = await CollegeInfo.create(req.body);
    res.status(201).json(info);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read All
const getAllCollegeInfo = async (req, res) => {
  const data = await CollegeInfo.find();
  res.json(data);
};

// Read by ID
const getCollegeInfoById = async (req, res) => {
  try {
    const data = await CollegeInfo.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updateCollegeInfo = async (req, res) => {
  try {
    const updated = await CollegeInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
const deleteCollegeInfo = async (req, res) => {
  try {
    await CollegeInfo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCollegeInfo,
  getAllCollegeInfo,
  getCollegeInfoById,
  updateCollegeInfo,
  deleteCollegeInfo
};
