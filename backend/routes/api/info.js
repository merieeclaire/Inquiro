const express = require('express');
const router = express.Router();
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const {
  getPersonalInfo,
  postPersonalInfo,
  getSchoolInfo,
  postSchoolInfo,
  getCollegeInfo,
  postCollegeInfo
} = require('../../controllers/infoController');

// handling the get and post for each info section
router.get('/personal', verifyAccessToken, getPersonalInfo);
router.post('/personal', postPersonalInfo);

router.get('/school', verifyAccessToken, getSchoolInfo);
router.post('/school', postSchoolInfo);

router.get('/college', verifyAccessToken, getCollegeInfo);
router.post('/college', postCollegeInfo);

module.exports = router;
