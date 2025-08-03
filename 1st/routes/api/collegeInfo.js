const express = require('express');
const router = express.Router();
const {
  createCollegeInfo,
  getAllCollegeInfo,
  getCollegeInfoById,
  updateCollegeInfo,
  deleteCollegeInfo
} = require('../../controllers/collegeInfoController');

router.route('/')
  .get(getAllCollegeInfo)
  .post(createCollegeInfo);

router.route('/:id')
  .get(getCollegeInfoById)
  .put(updateCollegeInfo)
  .delete(deleteCollegeInfo);

module.exports = router;
