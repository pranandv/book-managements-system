const jwt = require('jsonwebtoken');

// Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  const token = tokenHeader.split(' ')[1];

  console.log("token===>",token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }
console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    console.log("decoded",decoded)
    req.user = decoded;
    next();
  });
};
