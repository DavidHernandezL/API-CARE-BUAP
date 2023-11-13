const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
  
  const { token } = req.cookies;
  if (!token) return res.status(404).json({ msg: 'No encontrado' });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: 'No autorizado' });
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyAuthToken,
};
