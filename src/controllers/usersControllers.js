const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUserController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;
  if (!name || !username || !gender || !email || !password) throw new Error(`Los datos están incompletos`);
  const userExist = await User.findOne({ where: { email } });
  if (userExist) throw new Error("Usuario ya registrado");

  // const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  return {
    message: "Usuario creado exitosamente",
    user: newUser
  };
};

const getAllUsersController = async () => {

  const users = await User.findAll();

  if (!users.length) {
    throw new Error("No hay Usuarios");
  };

  return {
    message: "Usuarios encontrados",
    users,
  };
};

const getUsersByNameController = async (name) => {

  const usersByName = await User.findAll({ where: { name } });

  if (usersByName.length === 0) {
    throw new Error(`No se encontró ningún usuario con ese nombre`);
  };

  return {
    message: "Usuario encontrado",
    usersByName: usersByName,
  };
};

const getOneUserByIdController = async (id) => {

  const userById = await User.findByPk(id);

  if (!userById) {
    throw new Error(`No se encontró el usuario con ese ID`);
  }

  return {
    message: "Usuario encontrado",
    user: userById
  };
};

const updateUserController = async (id, userData) => {
  const { name, username, gender, email, password, phone, isActive, role } = userData;

  const userById = await User.findByPk(id);
  if (!userById) throw new Error("Usuario no encontrado");

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

  if (!deleteUser) throw new Error("Usuario no encontrado");

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