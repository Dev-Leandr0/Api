const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const setupLogger = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {

    // Ruta donde se crea la carpeta logs
    const logDirectory = path.join(__dirname, '..', 'logs');

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const accessLogStream = fs.createWriteStream(
      path.join(logDirectory, 'access.log'),
      { flags: 'a' });

    app.use(morgan('combined', { stream: accessLogStream }));

  }
};

module.exports = setupLogger;