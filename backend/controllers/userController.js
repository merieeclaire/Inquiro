const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logToken = require('../utils/logger');

// handling user registration
const registerUser = async (req, res) => {
  const { email, password } = req.body; // register new user
  
  // validating the inputs
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' });
  
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: 'User already exists' });
  
  //encrypt passsword, hash passwaord
  const hashedPwd = await bcrypt.hash(password, 10);

  //save new user to DB
  const newUser = new User({ email, password: hashedPwd });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};

// handling user login and issues tokens
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validate inputs
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

  // gets user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const userInfo = { email: user.email };

  // create access token for 15s
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
  // create refresh token for 30s
  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' });

  // log tokens
  logToken('AccessToken', accessToken);
  logToken('RefreshToken', refreshToken);

  // store in refresh token in cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    maxAge: 30 * 1000, // 30 seconds
  });

  // sending tokens and expiry timestamps
  res.json({
    accessToken,
    accessTokenExp: Date.now() + 15000,  // Send expiration timestamps
    refreshTokenExp: Date.now() + 30000
  });
};

// refresh access token using refresh token in cookie
const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;

  // if no refresh token found
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    // used when access token is expired, but refresh token is still valid
    // checking if refresh token is still valid, if valid issue new token and return them
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userInfo = { email: decoded.email };

    const newAccessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    const newRefreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' });

    logToken('AccessToken (REFRESH)', newAccessToken);
    logToken('RefreshToken (REFRESH)', newRefreshToken);

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 30 * 1000
    });

    res.json({
      accessToken: newAccessToken,
      accessTokenExp: Date.now() + 15000,
      refreshTokenExp: Date.now() + 30000
    });
  } catch (err) {
    console.log('Refresh token invalid:', err.message);
    res.sendStatus(403);
  }
};



const logoutUser = (req, res) => {
  // deleting refresh token from cookie
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict', secure: false });
  res.json({ message: 'Logged out successfully' });
};



module.exports = { registerUser, loginUser, logoutUser, refreshAccessToken };
