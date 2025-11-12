const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check karo ki request ke headers mein token hai ya nahi
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Token ko header se nikalo ('Bearer' word hata kar)
      token = req.headers.authorization.split(' ')[1];

      // 3. Token ko verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Token se user ki ID nikalkar, user ka data database se nikalo (bina password ke)
      // aur use request object mein daal do taaki aage ke routes use access kar sakein
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Sab kuch theek hai, ab request ko aage controller ke paas bhej do
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};