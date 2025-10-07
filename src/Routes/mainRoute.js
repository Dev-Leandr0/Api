const { Router } = require('express');
const mainRoute = Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');

// Users
mainRoute.use('/users', userRoutes);

// Products
mainRoute.use('/products', productRoutes);

//Auth 
mainRoute.use('/auth', authRoutes);

module.exports = mainRoute;