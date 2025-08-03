const User = require('../model/User');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'Lax' });
      return res.sendStatus(204);
    }

    // ✅ Safely remove refresh token without version conflict
    await User.updateOne(
      { _id: foundUser._id },
      { $pull: { refreshToken: refreshToken } }
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'Lax' });
    return res.sendStatus(204);
  } catch (err) {
    console.error('Logout error:', err);
    return res.sendStatus(500);
  }
};

module.exports = { handleLogout };
