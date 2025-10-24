/* =======================================================
 * Rutas de autenticación
 * =======================================================
 * - POST /register: registra un nuevo usuario usando registerHandler
 * - POST /login: inicia sesión de un usuario usando loginHandler
 * 
 * Estas rutas delegan la lógica al handler correspondiente y manejan la validación y respuesta
*/

const { Router } = require('express');
const { registerHandler, loginHandler } = require('../handlers/authHandlers');

const authRoutes = Router();

authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);

module.exports = authRoutes;