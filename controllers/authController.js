const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ username });
    if (user) {
      return res.status(404).json({ status:"fail",message: 'Username already exist' });
    }

    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ status:"success",message: 'User created successfully'});
  } catch (error) {
    console.log("err",error)
    res.status(500).json({ status:"fail",message: error.message});
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ status:"fail",message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({status:"fail",message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });
    res.status(200).json({status:"success", message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ status:"fail",error: error.message });
  }
};
