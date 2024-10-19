const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('IN middlewaare');
  
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from "Authorization" header

  if (!token) {
  console.log('IN middlewaare 1');

    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
