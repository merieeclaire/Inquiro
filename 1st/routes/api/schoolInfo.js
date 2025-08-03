const express = require('express');
const router = express.Router();
const {
  createSchoolInfo,
  getAllSchoolInfo,
  getSchoolInfoById,
  updateSchoolInfo,
  deleteSchoolInfo
} = require('../../controllers/schoolInfoController');

router.route('/')
  .get(getAllSchoolInfo)
  .post(createSchoolInfo);

router.route('/:id')
  .get(getSchoolInfoById)
  .put(updateSchoolInfo)
  .delete(deleteSchoolInfo);

module.exports = router;
