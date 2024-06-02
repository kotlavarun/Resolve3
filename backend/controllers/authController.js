const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        email,
        password
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const payload = {
        user: {
          id: user.id,
          role: 'user'
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (role === 'admin') {
      const admin = await Admin.findOne({ username: email });
      if (!admin) return res.status(400).json({ msg: 'Admin not found' });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
