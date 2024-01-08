require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  port: process.env.PORT ,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
}
