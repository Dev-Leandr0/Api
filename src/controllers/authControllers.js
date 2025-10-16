const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const registerController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;
  // if (!name || !username || !gender || !email || !password) throw new Error(`Los datos están incompletos`);

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    throw new Error("Usuario ya registrado");
  };

  // const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  return {
    message: "Usuario registrado exitosamente",
    user: newUser
  };
};

const loginController = async (email, password) => {

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Usuario no registrado");
  };

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw new Error("Contraseña incorrecta");
  };

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const { password: _, ...userWithoutPass } = user.get({ plain: true });
  return { message: "Inicio de sesion exitoso", user: userWithoutPass, token };
};

module.exports = {
  registerController,
  loginController
}