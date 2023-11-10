const jwt = require('jsonwebtoken');

const createAccessToken = (payload, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, { expiresIn }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  createAccessToken,
};
