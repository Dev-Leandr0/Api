const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const setupLogger = (app) => {

  const logFormat = process.env.MORGAN_LOG;

  console.log(`- Morgan Logger - usando formato: ${logFormat}\n`);

  if (logFormat === 'dev') {
    app.use(morgan('dev'));
  } else {

    // Ruta donde se crea la carpeta logs
    const logDirectory = path.join(__dirname, '..', 'logs');

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    const accessLogStream = fs.createWriteStream(
      path.join(logDirectory, 'access.log'),
      { flags: 'a' }
    );

    app.use(morgan(logFormat, { stream: accessLogStream }));
  }
};

module.exports = setupLogger;