const SchoolInfo = require('../model/SchoolInfo');

// Create
const createSchoolInfo = async (req, res) => {
  try {
    const info = await SchoolInfo.create(req.body);
    res.status(201).json(info);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Read All
const getAllSchoolInfo = async (req, res) => {
  const data = await SchoolInfo.find();
  res.json(data);
};

// Read by ID
const getSchoolInfoById = async (req, res) => {
  try {
    const data = await SchoolInfo.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updateSchoolInfo = async (req, res) => {
  try {
    const updated = await SchoolInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
const deleteSchoolInfo = async (req, res) => {
  try {
    await SchoolInfo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSchoolInfo,
  getAllSchoolInfo,
  getSchoolInfoById,
  updateSchoolInfo,
  deleteSchoolInfo
};
