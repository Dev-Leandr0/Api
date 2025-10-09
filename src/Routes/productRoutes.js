const { Router } = require('express');
const { createProductHandler, getAllProductHandler, getOneProductByIdHandler, updateProductHandler, deleteProductHandler } = require('../handlers/productsHandlers');

const productRoutes = Router();

// Productos
productRoutes.get('/', getAllProductHandler);

productRoutes.get('/:id', getOneProductByIdHandler);

productRoutes.post('/', createProductHandler);

productRoutes.put('/:id', updateProductHandler);

productRoutes.delete('/:id', deleteProductHandler);

module.exports = productRoutes;
