const { createCategoryController, getCategoryByNameController, getAllCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryControllers");
const categorySchema = require("../validations/categoryValidation");

const createCategoryHandler = async (req, res, next) => {
  try {

    // Validación de datos de entrada con Joi
    const { error } = categorySchema.validate(req.body);
    if (error) {
      const error = new Error(error.details[0].message);
      error.status = 409;
      error.name = "Validation";
      throw error;
    }

    // Delegación al controller que maneja la creación en DB
    const { name } = req.body;
    const response = await createCategoryController({ name });
    return res.status(201).json(response);

  } catch (error) {
    next(error);
  };
};

const getAllCategoriesHandler = async (req, res, next) => {
  try {

    const { name } = req.query;
    if (name) {
      const response = await getCategoryByNameController(name);
      return res.status(200).json(response);

    } else {
      const response = await getAllCategoriesController();
      return res.status(200).json(response);
    };

  } catch (err) {
    next(err);
  };
};

const getCategoryByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getCategoryByIdController(id);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const updateCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const response = await updateCategoryController(id, { name });

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const deleteCategoryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteCategoryController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

module.exports = {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler
}