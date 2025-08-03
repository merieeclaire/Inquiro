const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logEvents } = require('../middleware/logEvents');

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) return res.sendStatus(401); // Unauthorized

    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '45s' }
    );

    // ✅ DEV DEBUG LOGS
    console.log('[DEV DEBUG] Access Token:', accessToken);
    console.log('[DEV DEBUG] Refresh Token (last 10 chars):', newRefreshToken.slice(-10));

    // Prepare new refresh token array
    let newRefreshTokenArray = foundUser.refreshToken || [];

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

      newRefreshTokenArray = newRefreshTokenArray.filter(rt => rt !== refreshToken);

      const reuseDetected = !(await User.findOne({ refreshToken }).exec());
      if (reuseDetected) {
        console.log('Refresh token reuse detected during login');
        newRefreshTokenArray = [];
      }
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

    try {
      const result = await foundUser.save();
      console.log('User updated with new refresh token:', result.username);
    } catch (saveError) {
      console.error('Failed to save user:', saveError);
      return res.status(500).json({ message: 'Server error saving refresh token' });
    }

    // 📝 Log access and refresh token snippets to reqLog.txt
    await logEvents(
      `[LOGIN SUCCESS] User: ${foundUser.username} | AccessToken (last 10): ...${accessToken.slice(-10)} | RefreshToken (last 10): ...${newRefreshToken.slice(-10)}`,
      'reqLog.txt'
    );


    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 45 * 1000
    });

    res.json({ roles, accessToken });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { handleLogin };
