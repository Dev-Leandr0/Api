const { Router } = require('express');
const { createUserHandler, getAllUsersHandler, getUserByIdHandler, getUsersByNameHandler, getUsersByStatusHandler, updateUserHandler, deleteUserHandler, deleteSoftUserHandler } = require("../handlers/userHandlers");

const verifyToken = require('../middleware/verifyToken');
const authorizationAdmin = require('../middleware/authorizeMiddleware');

const userRoutes = Router();

/* ===== Crear ===== */
userRoutes.post('/', createUserHandler);

/* ===== Rutas Fijas ===== */
userRoutes.get('/status', getUsersByStatusHandler);
userRoutes.get('/name', getUsersByNameHandler);
userRoutes.get('/token', verifyToken, authorizationAdmin, getAllUsersHandler);

/* ===== Rutas Generales ===== */
userRoutes.get('/', getAllUsersHandler);
userRoutes.get('/:id', getUserByIdHandler);

/* ===== Update ===== */
userRoutes.put('/:id', updateUserHandler);
// userRoutes.patch('/:id', updateUserHandler);

/* ===== Delete ===== */
userRoutes.delete('/soft/:id', deleteSoftUserHandler);
userRoutes.delete('/:id', deleteUserHandler);


module.exports = userRoutes;