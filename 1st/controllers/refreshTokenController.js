const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // No cookie

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    // 🛡️ Detect refresh token reuse (possible attack)
    if (!foundUser) {
      console.log('🔐 Possible refresh token reuse detected!');

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const compromisedUser = await User.findOne({ username: decoded.username }).exec();
        if (compromisedUser) {
          compromisedUser.refreshToken = [];
          await compromisedUser.save();
        }
      });

      return res.sendStatus(403);
    }

    // Filter out the old refresh token
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // 🔁 Check if refresh token is still valid
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log('⚠️ Refresh token expired or invalid');

          foundUser.refreshToken = newRefreshTokenArray;
          await foundUser.save();
          return res.sendStatus(403);
        }

        if (foundUser.username !== decoded.username) return res.sendStatus(403); // Mismatch

        const roles = Object.values(foundUser.roles);

        // ✅ Valid refresh token – issue new tokens
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
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

        // Save new refresh token
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // 🍪 Send new refresh token in httpOnly cookie
        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 45 * 1000 // 45s
        });

        res.json({ roles, accessToken, refreshTokenTail: newRefreshToken.slice(-10) });
      }
    );
  } catch (err) {
    console.error('❌ Error in refreshTokenController:', err);
    res.sendStatus(500);
  }
};

module.exports = { handleRefreshToken };
