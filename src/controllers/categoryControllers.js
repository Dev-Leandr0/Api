const Category = require("../models/Category");

/* =======================================================
 * CREATE: Controlador de creación de categoría
 * =======================================================
 * Verifica si ya existe una categoría registrada con el mismo nombre
 * Si no existe, crea la nueva categoría en la base de dato
 * Devuelve un mensaje de confirmación y los datos de la categoría creada
*/
const createCategoryController = async (categoryData) => {

  const { name } = categoryData;

  const categoryExist = await Category.findOne({ where: { name } });
  // Validación: verificar si la categoría ya existe [name]
  if (categoryExist) {
    const err = new Error("Categoría ya registrada");
    err.status = 409;
    throw err;
  };

  // Creación de la categoría
  const newCategory = await Category.create({ name });

  /* ===== Respuesta ===== */
  return {
    message: "Categoría agregada exitosamente",
    category: newCategory
  };
};


/* =======================================================
 * LECTURA: Controlador de obtención de todas las categorías
 * =======================================================
 * - getAllCategoriesController: recupera todas las categorías registradas en la DB
 * - getCategoryByNameController: busca categorías que coincidan con un nombre específico
 * - getCategoryByIdController: obtiene una categoría según su ID
 * 
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found)  
 * - Devuelven un mensaje de éxito junto con los datos encontrados
*/
const getAllCategoriesController = async () => {

  const categories = await Category.findAll();
  // Validación: verificar si hay categorías
  if (!categories.length) {
    const err = new Error("No hay Categorías");
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Categorías encontradas",
    categories,
  };
};

const getCategoryByNameController = async (name) => {

  const categoriesByName = await Category.findAll({ where: { name } });
  // Validación: verificar si la categoría existe con ese nombre
  if (categoriesByName.length === 0) {
    const err = new Error(`No se encontró ninguna categoría con ese nombre`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Categoría encontrada",
    categoriesByName: categoriesByName,
  };
};

const getCategoryByIdController = async (id) => {

  const categoryById = await Category.findByPk(id);
  // Validación: existencia por id
  if (!categoryById) {
    const err = new Error(`No se encontró la categoría con ese ID`);
    err.status = 404;
    throw err;
  }

  /* ===== Respuesta ===== */
  return {
    message: "Categoría encontrada",
    category: categoryById
  };
};


/* =======================================================
 * UPDATE: Controlador de actualización de categoría
 * =======================================================
 * - Busca la categoría en la DB usando el ID proporcionado
 * - Si no se encuentra, lanza un error 404 indicando que no existe
 * - Actualiza los campos proporcionados [name]
 * - Devuelve un mensaje de éxito junto con la categoría actualizada.
*/
const updateCategoryController = async (id, categoryData) => {

  const { name } = categoryData;

  // Validación: existencia por id
  const categoryById = await Category.findByPk(id);
  if (!categoryById) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  };

  //Preparación de los campos a actualizar
  const updatedFields = {
    name,
  };

  // Actualización en la DB
  const categoryUpdate = await categoryById.update(updatedFields);

  /* ===== Respuesta ===== */
  return {
    message: "Categoría actualizada",
    category: categoryUpdate,
  };
};


/* =======================================================
 * DELETE: Controlador de eliminación de categoría
 * =======================================================
 * - Busca la categoría en la DB usando el ID proporcionado
 * - Si no se encuentra, lanza un error 404 indicando que no existe.  
 * - Eliminacion permanente la categoría de la DB.  
 * - Devuelve un mensaje de éxito junto con los datos de la categoría eliminada.
*/
const deleteCategoryController = async (id) => {

  const categoryDelete = await Category.findByPk(id);
  // Validación: existencia del usuario por ID
  if (!categoryDelete) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  //  Eliminación del usuario PERMANENTEMENTE
  await categoryDelete.destroy();

  /* ===== Respuesta ===== */
  return {
    message: "Categoría eliminada",
    category: categoryDelete
  };
};


// getCategoryWithProductsController {Incluye productos dentro de la categoría seleccionada}

// getCategoryStatsController {Devuelve total de productos, precios promedio, etc}

module.exports = {
  // create
  createCategoryController,

  //lectura
  getAllCategoriesController,
  getCategoryByNameController,
  getCategoryByIdController,

  //update
  updateCategoryController,

  //delete
  deleteCategoryController, //delete permanente
}