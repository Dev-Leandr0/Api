/* =======================================================
 * Configuración principal de la aplicación Express
 * =======================================================
 * - Configura Express, rutas principales y middleware global de errores.  
 * - Inicializa logging de solicitudes con Morgan.
*/

const express = require('express');
const mainRoute = require('./Routes/mainRoute');
const setupLogger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());

// Logging de solicitudes
setupLogger(app);

// Rutas principales
app.use('/api', mainRoute);

// Middleware global de manejo de errores
app.use(errorHandler);

module.exports = app;