var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token requerido');
    err.status = 401;
    return next(err);
  };

  if (!token.startsWith('Bearer ')) {
    const err = new Error('Formato de token inválido');
    err.status = 401;
    return next(err);
  }
  const jwtToken = token.split(' ')[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      const err = new Error('Token inválido o expirado');
      err.status = 401;
      return next(err);
    };
    req.user = decode;
    next();
  });
};

module.exports = verifyToken;