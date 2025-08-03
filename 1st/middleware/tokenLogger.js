// middleware/tokenLogger.js
const tokenLogger = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const refreshToken = req.cookies?.jwt;

  console.log('\n[Token Logger]');
  console.log(`Access Token: ${accessToken || 'None Provided'}`);
  console.log(`Refresh Token (Cookie): ${refreshToken || 'None Provided'}`);
  console.log('[End Token Logger]\n');

  next();
};

module.exports = tokenLogger;
