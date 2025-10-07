const users = require('../db/database');
const bcrypt = require('bcrypt');

const createUserController = async (name, username, email, password, role) => {
  const id = users.length + 1;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = { id, name, username, email, password: hashPassword, role };
  if (!name || !username || !email || !password) throw new Error(`Los datos están incompletos`);
  users.push(newUser);
  return newUser;
};

const getAllUsersController = () => {
  return users;
}

const getUsersByNameController = (name) => {
  const userByName = users.filter((user) => user.name === name);
  if (!userByName.length) throw new Error(`No se encontró al usuario`);
  return userByName;
}

const getOneUserByIdController = (id) => {
  const userById = users.find((user) => user.id === Number(id));
  if (!userById) throw new Error(`No se encontró el usuario con ese ID`);
  return userById;
}

const updateUserController = (id, name, username, email) => {
  const newUser = { name, username, email };
  const userById = users.find((user) => user.id === Number(id));
  if (userById) {
    Object.assign(userById, newUser);
  }
  return userById;
}

const deleteUserController = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));
  let deleteUser;
  if (index !== -1) {
    [deleteUser] = users.splice(index, 1);
  }
  return deleteUser;
}

module.exports = {
  createUserController,
  getAllUsersController,
  getUsersByNameController,
  getOneUserByIdController,
  updateUserController,
  deleteUserController,
}