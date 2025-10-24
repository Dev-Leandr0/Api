const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* =======================================================
 * Controlador de registro de usuario
 * =======================================================
 * Verifica que el email exista 
 * Si no existe, crea el usuario en la base de datos
 * El hash de la contraseña se aplica automáticamente mediante un hook en el modelo Sequelize
 * Devuelve un mensaje de confirmación y los datos del usuario creado
*/
const registerController = async (userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  // Validación: verificar si el usuario ya existe [email]
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    const err = new Error("Usuario ya registrado");
    err.status = 409;
    throw err;
  };

  /*  ===== Creación del usuario =====  */
  // Nota: El hash de la contraseña se aplica automáticamente en el hook del modelo
  const newUser = await User.create({ name, username, gender, email, password, phone, isActive, role });

  /* ===== Respuesta ===== */
  return {
    message: "Usuario registrado exitosamente",
    user: newUser
  };
};

/* =======================================================
 * Controlador de inicio de sesión de usuario
 * =======================================================
 * - Verifica que el email exista
 * - Compara la contraseña hasheada
 * - Genera un token JWT válido
 * - Devuelve el usuario sin la contraseña
 */
const loginController = async (email, password) => {

  // Validación: verificar si el usuario existe [email]
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error("Usuario no registrado");
    err.status = 404;
    throw err;
  };

  // Validación: verificar si la pass coinciden [password]
  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    const err = new Error("Contraseña incorrecta");
    err.status = 401;
    throw err;
  }

  /* ===== Generación del token JWT ===== */
  // Se incluye el id y el role del usuario
  // La clave secreta y la expiración se toman del archivo .env
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Se remueve la contraseña antes de devolver el usuario al cliente
  const { password: _, ...userWithoutPass } = user.get({ plain: true });

  /* ===== Respuesta ===== */
  return { message: "Inicio de sesión exitoso", user: userWithoutPass, token };
};

module.exports = {
  registerController,
  loginController
}