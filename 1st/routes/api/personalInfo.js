const express = require('express');
const router = express.Router();
const {
  createPersonalInfo,
  getAllPersonalInfo,
  getPersonalInfoById,
  updatePersonalInfo,
  deletePersonalInfo
} = require('../../controllers/personalInfoController');

router.route('/')
  .get(getAllPersonalInfo)
  .post(createPersonalInfo);

router.route('/:id')
  .get(getPersonalInfoById)
  .put(updatePersonalInfo)
  .delete(deletePersonalInfo);

module.exports = router;
