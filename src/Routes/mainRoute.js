const { Router } = require('express');
const mainRoute = Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');

// Users
mainRoute.use('/users', userRoutes);

// Products
mainRoute.use('/products', productRoutes);

//Auth 
mainRoute.use('/auth', authRoutes);

// Category
mainRoute.use('/categories', categoryRoutes);

module.exports = mainRoute;