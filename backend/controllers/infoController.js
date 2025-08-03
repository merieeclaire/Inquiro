const PersonalInfo = require('../model/PersonalInfo');
const SchoolInfo = require('../model/SchoolInfo');
const CollegeInfo = require('../model/CollegeInfo');

const getInfo = (Model) => async (req, res) => {
  // get record from MongoDB using the registered email
  const email = req.user.email;

  const info = await Model.findOne({ userEmail: email });
  if (!info) return res.status(404).json({ message: 'Not found' });

  res.json(info);
};

const postInfo = (Model) => async (req, res) => {
  const { userEmail, ...data } = req.body;
  if (!userEmail) return res.status(400).json({ message: 'userEmail is required' });

  // inserting or updating inofs using userEmail as identifier
  // where 3 modules used: PersonalInfo, SchoolInfo, and CollegeInfo
  await Model.findOneAndUpdate({ userEmail }, { userEmail, ...data }, { upsert: true });
  res.json({ message: 'Information saved/updated successfully' });
};

module.exports = {
  getPersonalInfo: getInfo(PersonalInfo),
  postPersonalInfo: postInfo(PersonalInfo),

  getSchoolInfo: getInfo(SchoolInfo),
  postSchoolInfo: postInfo(SchoolInfo),

  getCollegeInfo: getInfo(CollegeInfo),
  postCollegeInfo: postInfo(CollegeInfo),
};
