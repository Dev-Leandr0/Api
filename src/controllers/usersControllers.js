const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUserController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    const err = new Error("Usuario ya registrado");
    err.status = 409;
    throw err;
  };

  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  return {
    message: "Usuario creado exitosamente",
    user: newUser
  };
};

const getAllUsersController = async () => {

  const users = await User.findAll();

  if (!users.length) {
    const err = new Error("No hay Usuarios");
    err.status = 404;
    throw err;
  };

  return {
    message: "Usuarios encontrados",
    users,
  };
};

const getUsersByNameController = async (name) => {

  const usersByName = await User.findAll({ where: { name } });

  if (usersByName.length === 0) {
    const err = new Error(`No se encontró ningún usuario con ese nombre`);
    err.status = 404;
    throw err;
  };

  return {
    message: "Usuario encontrado",
    usersByName: usersByName,
  };
};

const getOneUserByIdController = async (id) => {

  const userById = await User.findByPk(id);

  if (!userById) {
    const err = new Error(`No se encontró el usuario con ese ID`);
    err.status = 404;
    throw err;
  }

  return {
    message: "Usuario encontrado",
    user: userById
  };
};

const updateUserController = async (id, userData) => {
  const { name, username, gender, email, password, phone, isActive, role } = userData;

  const userById = await User.findByPk(id);
  if (!userById) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  };

  const updatedFields = {
    name,
    username,
    gender,
    email,
    password,
    phone,
    isActive,
    role,
  };

  const userUpdate = await userById.update(updatedFields);

  return {
    message: "Usuario actualizado",
    user: userUpdate,
  };
};

const deleteUserController = async (id) => {

  const deleteUser = await User.findByPk(id);

  if (!deleteUser) {

    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  await deleteUser.destroy();

  return {
    message: "Usuario eliminado",
    user: deleteUser
  };
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserByIdController,
  updateUserController,
  deleteUserController,
}