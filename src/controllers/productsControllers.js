const Product = require("../models/Product");
const Category = require("../models/Category");

/* =======================================================
 * CREATE: Controlador de creación de producto
 * ======================================================= 
 * - Verifica si ya existe un producto con el mismo nombre, lanzando un error 409 si es así
 * - Valida que se proporcione un categoryId válido, lanzando un error 404 si no existe
 * - Crea el producto en la DB con los datos proporcionados
 * - Devuelve un mensaje de confirmación junto con el producto creado
*/
const createProductController = async (productData) => {

  const { name, description, price, stock, categoryId, image, isActive } = productData;

  //Validación: verificar si el producto ya existe por nombre
  const productExist = await Product.findOne({ where: { name } });
  if (productExist) {
    const err = new Error("Producto ya Registrado");
    err.status = 409;
    throw err;
  };

  // Validación: verificar que se proporcione categoryId
  if (!categoryId) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Creación del producto
  const newProduct = await Product.create({ name, description, price, stock, categoryId, image, isActive });

  /* ===== Respuesta ===== */
  return {
    message: "Producto creado exitosamente",
    product: newProduct,
  };
};


/* =======================================================
 * LECTURA: Controladores de lectura de productos
 * ======================================================= 
 * - getAllProductController: recupera todos los productos registrados en la DB
 * - getProductByNameController: busca productos que coincidan con name
 * - getOneProductByIdController: obtiene un producto según su ID
 * - getProductsByCategoryController: obtiene todos los productos de una categoría específica, incluyendo información básica de la categoría
 *
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found)
 * - Devuelven un mensaje de éxito junto con los datos encontradoS
*/
const getAllProductController = async () => {

  const products = await Product.findAll();
  // Validación: verificar si existen productos
  if (!products.length) {
    const err = new Error("No hay Productos");
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Productos encontrados",
    products,
  };
};

const getProductByNameController = async (name) => {

  const productsByName = await Product.findAll({ where: { name } });
  // Validación: verificar si existen resultados
  if (productsByName.length === 0) {
    const err = new Error(`No se encontró ningún producto con ese nombre`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "producto encontrado",
    productsByName: productsByName,
  };
};

const getOneProductByIdController = async (id) => {

  const productById = await Product.findByPk(id);
  // Validación: verificar si existe el producto
  if (!productById) {
    const err = new Error(`No se encontró el producto con ese ID`);
    err.status = 404;
    throw err;
  }

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    product: productById,
  };
};

const getProductsByCategoryController = async (categoryId) => {

  // Consulta productos filtrando por categoryId
  const products = await Product.findAll({
    where: { categoryId },
    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
  });

  // Validación: verificar si existen productos
  if (products.length === 0) {
    const err = new Error("No hay productos en esta categoría");
    err.status = 404;
    throw err;
  }

  // * ===== Respuesta ===== */
  return {
    message: "Productos encontrados",
    products,
  };
};


/* =======================================================
 * UPDATE: Controlador de actualización de producto
 * ======================================================= 
 * - Busca el producto en la DB usando el ID proporcionado
 * - Verifica que exista la categoría asociada al producto; si no, lanza error 404
 * - Actualiza los campos proporcionados en productData
 * - Devuelve un mensaje de éxito junto con el producto actualizado
*/
const updateProductController = async (id, productData) => {

  const { name, description, price, stock, categoryId, image, isActive } = productData;

  const productById = await Product.findByPk(id);
  // Validación: existencia del producto por ID
  if (!productById) {
    const err = new Error("Producto no encontrado");
    err.status = 404;
    throw err;
  }

  // Validación: existencia de la categoría asociada
  if (!categoryId) {
    const err = new Error("Categoría no encontrada");
    err.status = 404;
    throw err;
  }

  // Campos para actualizar 
  const updatedFields = {
    name,
    description,
    price,
    stock,
    categoryId,
    image,
    isActive,
  };

  // Actualización en la DB
  const updateProduct = await productById.update(updatedFields);

  /* ===== Respuesta ===== */
  return {
    message: "Producto actualizado",
    product: updateProduct
  };
};


/* -------------------------------------------------------
 * DELETE: Controlador de eliminación de producto
 * -------------------------------------------------------
 * - Busca el producto en la base de datos usando el ID proporcionado.  
 * - Si no se encuentra, lanza un error 404 indicando que no existe.  
 * - Elimina el producto de la base de datos.  
 * - Devuelve un mensaje de éxito junto con los datos del producto eliminado.
*/
const deleteProductController = async (id) => {

  const deleteProduct = await Product.findByPk(id);
  // Validación: existencia del producto por ID
  if (!deleteProduct) {
    const err = new Error(`Producto no encontrado`);
    err.status = 404;
    throw err;
  }

  // Eliminacion Permanente
  await deleteProduct.destroy();

  // Respuesta
  return {
    message: "Producto eliminado",
    product: deleteProduct,
  };
};

// getDiscountedProductsController {Devuelve solo productos en oferta o con descuento}

module.exports = {
  // create
  createProductController,
  // lectura
  getAllProductController,
  getProductByNameController,
  getOneProductByIdController,
  getProductsByCategoryController,
  // update
  updateProductController,
  // delete
  deleteProductController, // Eliminacion permanente

}