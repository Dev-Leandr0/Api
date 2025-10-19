const { Router } = require('express');
const { getAllUserHandler, getOneUserHandler, createUserHandler, updateUserHandler, deleteUserHandler } = require("../handlers/userHandlers");
const verifyToken = require('../middleware/verifyToken');
const authorizationAdmin = require('../middleware/authorizeMiddleware');

const userRoutes = Router();

// Usuarios
userRoutes.get('/', /*verifyToken, authorizationAdmin ,*/ getAllUserHandler);

userRoutes.get('/token', verifyToken, authorizationAdmin, getAllUserHandler);

userRoutes.get('/:id', getOneUserHandler);

userRoutes.post('/', createUserHandler);

userRoutes.put('/:id', updateUserHandler);

userRoutes.delete('/:id', deleteUserHandler);

module.exports = userRoutes;