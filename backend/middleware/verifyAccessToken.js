// Import the jsonwebtoken package to handle JWT operations
const jwt = require('jsonwebtoken');

// Middleware function to verify the access token on protected routes
const verifyAccessToken = (req, res, next) => {
  // Get the Authorization header (e.g., "Bearer <token>")
  const authHeader = req.headers.authorization;

  // If the Authorization header is missing or doesn't start with 'Bearer ', reject the request
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No or malformed token' }); // Unauthorized
  }

  // Extract the token from the header string
  // "Bearer <token>" → take index [1] which is the token
  const token = authHeader.split(' ')[1];

  // Verify the token using the access token secret
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // If there's an error verifying (e.g. expired or invalid), reject the request
    if (err) return res.status(403).json({ message: 'Invalid or expired token' }); // Forbidden

    // If token is valid, attach the decoded payload to the request (usually contains user's email or ID)
    req.user = decoded; // attach decoded email to request
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyAccessToken;
