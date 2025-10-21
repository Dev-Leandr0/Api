const { Router } = require('express');
const { createProductHandler, getAllProductHandler, getOneProductByIdHandler, updateProductHandler, deleteProductHandler, getProductsByCategoryHandler } = require('../handlers/productsHandlers');

const productRoutes = Router();

productRoutes.post('/', createProductHandler);

// Todos
productRoutes.get('/', getAllProductHandler);

// Id
productRoutes.get('/:id', getOneProductByIdHandler);

// Categoría
productRoutes.get('/category/:categoryId', getProductsByCategoryHandler);

productRoutes.put('/:id', updateProductHandler);

productRoutes.delete('/:id', deleteProductHandler);

module.exports = productRoutes;