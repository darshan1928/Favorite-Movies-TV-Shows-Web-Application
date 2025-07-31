const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
  
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log(req.user,"===req.user")
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
module.exports = authenticate;