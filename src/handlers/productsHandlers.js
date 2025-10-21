const { createProductController, getOneProductByIdController, updateProductController, deleteProductController, getAllProductController, getProductByNameController, getProductsByCategoryController } = require('../controllers/productsControllers');

//Validación de Joi 
const { productSchema } = require("../validations/productsValidation");

const createProductHandler = async (req, res, next) => {

  try {

    const { error } = productSchema.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 409;
      err.name = "Validation";
      throw err;
    }

    const { name, description, price, stock, categoryId, image, isActive } = req.body;
    const response = await createProductController({ name, description, price, stock, categoryId, image, isActive });

    return res.status(201).json(response);

  } catch (err) {
    next(err);
  };
};

// Todos o por "Nombre"
const getAllProductHandler = async (req, res, next) => {
  try {

    const { name } = req.query;
    if (name) {
      const response = await getProductByNameController(name);
      return res.status(200).json(response);

    } else {
      const response = await getAllProductController();
      return res.status(200).json(response);
    };

  } catch (err) {
    next(err);
  };
};

// Por ID
const getOneProductByIdHandler = async (req, res, next) => {

  try {
    const { id } = req.params;
    const response = await getOneProductByIdController(id);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

// Por categoría
const getProductsByCategoryHandler = async (req, res, next) => {

  try {
    const { categoryId } = req.params;
    const response = await getProductsByCategoryController(categoryId);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  }
};

const updateProductHandler = async (req, res, next) => {

  try {

    const { id } = req.params;
    const { name, description, price, stock, categoryId, image, isActive } = req.body;

    const response = await updateProductController(id, { name, description, price, stock, categoryId, image, isActive });

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const deleteProductHandler = async (req, res, next) => {

  try {
    const { id } = req.params;

    const response = await deleteProductController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

module.exports = {
  createProductHandler,
  getAllProductHandler,
  getOneProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsByCategoryHandler,
}