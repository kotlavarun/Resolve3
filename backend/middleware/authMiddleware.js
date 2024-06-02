const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.adminProtect = (req, res, next) => {
  this.protect(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin resources. Access denied.' });
    }
    next();
  });
};
