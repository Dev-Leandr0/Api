const { Router } = require('express');
const { getAllCategoriesHandler, getCategoryByIdHandler, createCategoryHandler, updateCategoryHandler, deleteCategoryHandler } = require('../handlers/categoryHandlers');

const categoryRoutes = Router();

// Usuarios
categoryRoutes.get('/', getAllCategoriesHandler);

categoryRoutes.get('/:id', getCategoryByIdHandler);

categoryRoutes.post('/', createCategoryHandler);

categoryRoutes.put('/:id', updateCategoryHandler);

categoryRoutes.delete('/:id', deleteCategoryHandler);

module.exports = categoryRoutes;