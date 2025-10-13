const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const createUserController = async (name, username, email, password, phone, role) => {
  const userExist = await User.findOne({ email });
  if (userExist) throw new Error("Usuario ya registrado");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, username, email, password: hashPassword, phone, role });

  if (!name || !username || !email || !password || !phone) throw new Error(`Los datos están incompletos`);
  await newUser.save();

  return {
    message: "Usuario creado exitosamente",
    user: newUser
  };
};

const getAllUsersController = async () => {
  const users = await User.find();
  if (!users.length) throw new Error("No hay Usuarios");

  return {
    message: "Usuarios encontrados",
    users
  };
};

const getUsersByNameController = async (name) => {
  const userByName = await User.find({ name });
  if (!userByName.length)
    throw new Error(`No se encontró al usuario`);
  return {
    message: "Usuario encontrado",
    user: userByName
  };
};

const getOneUserByIdController = async (id) => {
  const userById = await User.findById(id);
  if (!userById)
    throw new Error(`No se encontró el usuario con ese ID`);
  return {
    message: "Usuario encontrado",
    user: userById
  };
};

const updateUserController = async (id, name, username, email, phone) => {
  const newUser = { name, username, email, phone };
  const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true });

  if (!updateUser)
    throw new Error(`Usuario no encontrado`);

  return {
    message: "Usuario actualizado",
    user: updateUser
  };
};

const deleteUserController = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id);

  if (!deleteUser)
    throw new Error(`Usuario no encontrado`);

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