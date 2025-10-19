const express = require('express');
const mainRoute = require('./Routes/mainRoute');
const setupLogger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

// Configuración de Morgan
setupLogger(app);

// Ruta principal
app.use('/api', mainRoute);

// Middleware de Error
app.use(errorHandler);

module.exports = app;