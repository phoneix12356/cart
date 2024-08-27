const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("invalidToken");
    res.status(400).json({ error: 'Invalid token.' });
  }
};