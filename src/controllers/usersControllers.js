const User = require('../models/User.js');
const bcrypt = require('bcrypt');
// const { required } = require('joi');

const createUserController = async (name, username, email, password, phone, role) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, username, email, password: hashPassword, phone, role });

  if (!name || !username || !email || !password || !phone) throw new Error(`Los datos están incompletos`);

  await newUser.save();
  return newUser;

};

const getAllUsersController = async () => {
  if (!User.length) throw new Error("No hay Usuarios");
  return await User.find();
};

const getUsersByNameController = async (name) => {
  const userByName = await User.find({ name });
  if (!userByName.length)
    throw new Error(`No se encontró al usuario`);
  return userByName;
};

const getOneUserByIdController = async (id) => {
  const userById = await User.findById(id);
  if (!userById)
    throw new Error(`No se encontró el usuario con ese ID`);
  return userById;
};

const updateUserController = async (id, name, username, email, phone) => {
  const newUser = { name, username, email, phone };
  const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true });
  return updateUser;
};

const deleteUserController = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id);
  return deleteUser;
};

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserByIdController,
  updateUserController,
  deleteUserController,
}