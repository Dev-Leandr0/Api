const { createUserController, getAllUsersController, getUsersByNameController, getOneUserByIdController, updateUserController, deleteUserController } = require("../controllers/usersControllers");

//Validación de Joi 
const { userSchema } = require("../validations/userValidation.js");

const createUserHandler = async (req, res, next) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) {
      const error = new Error(error.details[0].message);
      error.status = 409;
      error.name = "Validation";
      throw error;
    }

    const { name, username, gender, email, password, phone, isActive, role } = req.body;
    const response = await createUserController({ name, username, gender, email, password, phone, isActive, role });

    return res.status(201).json(response);

  } catch (error) {
    next(error);
  };
};

const getAllUserHandler = async (req, res, next) => {
  try {

    const { name } = req.query;
    if (name) {
      const response = await getUsersByNameController(name);
      return res.status(200).json(response);

    } else {
      const response = await getAllUsersController();
      return res.status(200).json(response);
    };

  } catch (err) {
    next(err);
  };
};

const getOneUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getOneUserByIdController(id);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, gender, email, password, phone, isActive, role } = req.body;

    const response = await updateUserController(id, { name, username, gender, email, password, phone, isActive, role });

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

module.exports = {
  getAllUserHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};