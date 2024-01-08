const jwt = require('jsonwebtoken');

// Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  const token = tokenHeader.split(' ')[1];

  

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }


  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
   
    req.user = decoded;
    next();
  });
};
