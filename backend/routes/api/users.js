const express = require('express');
const router = express.Router();

// importing the controller functions for register, login, logout, refresh
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
} = require('../../controllers/userController');

// defining the routes and connecting them to handlers
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshAccessToken);
router.post('/logout', logoutUser);

const jwt = require('jsonwebtoken');
const logToken = require('../../utils/logger');

module.exports = router;
