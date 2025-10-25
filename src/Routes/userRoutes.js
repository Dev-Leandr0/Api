const { Router } = require('express');
const { createUserHandler, getAllUsersHandler, getUserByIdHandler, getUsersByNameHandler, getUsersByEmailHandler, getUsersByStatusHandler, getUsersByRoleHandler, updateUserHandler, updateUserStatusHandler, deleteUserHandler, deleteSoftUserHandler } = require("../handlers/userHandlers");

const verifyToken = require('../middleware/verifyToken');
const authorizationAdmin = require('../middleware/authorizeMiddleware');

const userRoutes = Router();

/* ===== Crear ===== */
userRoutes.post('/', createUserHandler);

/* ===== Rutas Fijas ===== */
userRoutes.get('/status', getUsersByStatusHandler);
userRoutes.get('/name', getUsersByNameHandler);
userRoutes.get('/email', getUsersByEmailHandler);
userRoutes.get('/role', getUsersByRoleHandler);
userRoutes.get('/token', verifyToken, authorizationAdmin, getAllUsersHandler);

/* ===== Rutas Generales ===== */
userRoutes.get('/', getAllUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);

/* ===== Update ===== */
userRoutes.patch('/:id/status', updateUserStatusHandler);
userRoutes.put('/:id', updateUserHandler);

/* ===== Delete ===== */
userRoutes.delete('/soft/:id', deleteSoftUserHandler);
userRoutes.delete('/:id', deleteUserHandler);


module.exports = userRoutes;