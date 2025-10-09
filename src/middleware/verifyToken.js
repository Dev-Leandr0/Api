var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send('Token requerido');
  };

  jwt.verify(token.split(' ')[1], 'MySecretKey', (err, decode) => {
    if (err) {
      return res.status(400).send('Token inválido');
    };
    req.user = decode;
    next();
  });
};

module.exports = verifyToken;