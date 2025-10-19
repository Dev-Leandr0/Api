const errorHandler = (err, req, res, next) => {

  console.error('Error detectado', err.message);

  let statusCode = err.status || 500;
  let message = err.message || 'Error interno del servidor';

  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'SequelizeDatabaseError') {
    statusCode = 500;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
  };

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      type: err.name || 'ServerError',
      status: statusCode,
    },
  });

};

module.exports = errorHandler;