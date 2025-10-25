const { createUserController, getAllUsersController, getUserByIdController, getUsersByNameController, getUsersByEmailController, getUsersByStatusController, getUsersByRolController, updateUserController, updateUserStatusController, deleteUserController, deleteSoftUserController } = require("../controllers/usersControllers");
const { validateUserData } = require('../validators/userValidator');

/* --- Crear --- */
const createUserHandler = async (req, res, next) => {
  try {

    // Validacion: Joi 
    const validData = validateUserData(req.body);

    const response = await createUserController(validData);

    return res.status(201).json(response);

  } catch (error) {
    next(error);
  };
};
/* --- Lectura --- */
const getAllUsersHandler = async (req, res, next) => {
  try {
    const response = await getAllUsersController();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await getUserByIdController(id);
    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};
const getUsersByNameHandler = async (req, res, next) => {

  try {
    const { name } = req.query;
    const response = await getUsersByNameController(name);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }

};
const getUsersByEmailHandler = async (req, res, next) => {

  try {
    const { email } = req.query;
    const response = await getUsersByEmailController(email);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }

};
const getUsersByRoleHandler = async (req, res, next) => {

  try {
    const { role } = req.query;
    const response = await getUsersByRolController(role);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }

};

/*--- Estados --- */
const getUsersByStatusHandler = async (req, res, next) => {
  try {

    const { isActive } = req.query;

    const response = await getUsersByStatusController(isActive);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

/*--- Update --- */
const updateUserHandler = async (req, res, next) => {
  try {

    // Validacion: Joi 
    const validData = validateUserData(req.body);

    const { id } = req.params;

    const response = await updateUserController(id, validData);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};
const updateUserStatusHandler = async (req, res, next) => {
  try {
    // Validacion: Joi 
    const validData = validateUserData(req.body);

    const { id } = req.params;

    const response = await updateUserStatusController(id, validData.isActive);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};

/* --- Delete --- */
const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUserController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};
const deleteSoftUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteSoftUserController(id);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  };
};


module.exports = {
  // Crear
  createUserHandler,

  //Lectura
  getAllUsersHandler,
  getUserByIdHandler,
  getUsersByNameHandler,
  getUsersByEmailHandler,
  getUsersByRoleHandler,

  //Estado
  getUsersByStatusHandler,

  // Update
  updateUserHandler,
  updateUserStatusHandler,

  // Delete
  deleteUserHandler,
  deleteSoftUserHandler,
};