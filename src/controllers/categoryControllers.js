const Product = require("../models/Product");
const Category = require("../models/Category");

const createCategoryController = async (categoryData) => {

  const { name } = categoryData;

  const categoryExist = await Category.findOne({ where: { name } });
  if (categoryExist) {
    const err = new Error("Categoría ya registrada");
    err.status = 409;
    throw err;
  };

  const newCategory = await Category.create({ name });

  return {
    message: "Categoría agregada exitosamente",
    category: newCategory
  };
};

const getAllCategoriesController = async () => {

  const categories = await Category.findAll();

  if (!categories.length) {
    const err = new Error("No hay Categorías");
    err.status = 404;
    throw err;
  };

  return {
    message: "Categorías encontradas",
    categories,
  };
};

const getCategoryByNameController = async (name) => {

  const categoriesByName = await Category.findAll({ where: { name } });

  if (categoriesByName.length === 0) {
    const err = new Error(`No se encontró ninguna categoría con ese nombre`);
    err.status = 404;
    throw err;
  };

  return {
    message: "Categoría encontrada",
    categoriesByName: categoriesByName,
  };
};

const getCategoryByIdController = async (id) => {

  const categoryById = await Category.findByPk(id);

  if (!categoryById) {
    const err = new Error(`No se encontró la categoría con ese ID`);
    err.status = 404;
    throw err;
  }

  return {
    message: "Categoría encontrada",
    category: categoryById
  };
};

const updateCategoryController = async (id, categoryData) => {
  const { name } = categoryData;

  const categoryById = await Category.findByPk(id);
  if (!categoryById) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  };

  const updatedFields = {
    name,
  };

  const categoryUpdate = await categoryById.update(updatedFields);

  return {
    message: "Categoría actualizada",
    category: categoryUpdate,
  };
};

const deleteCategoryController = async (id) => {

  const categoryDelete = await Category.findByPk(id);

  if (!categoryDelete) {

    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  await categoryDelete.destroy();

  return {
    message: "Categoría eliminada",
    category: categoryDelete
  };
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByNameController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
}