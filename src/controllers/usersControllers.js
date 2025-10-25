const User = require('../models/User');

/* =======================================================
 * CREATE: Controlador de crear usuario
 * =======================================================
 * Verifica que el email exista 
 * Si no existe, crea el usuario en la base de datos
 * El hash de la contraseña se aplica automáticamente mediante un hook en el modelo Sequelize
 * Devuelve un mensaje de confirmación y los datos del usuario creado
*/
const createUserController = async (userData) => {

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
    message: "Usuario creado exitosamente",
    user: newUser
  };
};


/* =======================================================
 * LECTURA: Controladores de lectura de usuarios
 * =======================================================
 * - getAllUsersController: recupera todos los usuarios registrados en la DB.  
 * - getUserByNameController: busca usuarios que coincidan con un nombre específico.  
 * - getUserByIdController: obtiene un usuario según su ID.  
 * - getUsersByStatusController: filtra usuarios por estado activo/inactivo (recibe 'true'/'false'). 
 * - getUsersByRolController: obtiene todos los usuarios según su rol ('user' o 'admin'). 
 * 
 * En todos los casos:
 * - Si no se encuentran resultados, se lanza un error 404 (Not Found).  
 * - Devuelven un mensaje de éxito junto con los datos encontrados.
*/
const getAllUsersController = async () => {

  const users = await User.findAll();

  // Validación: verificar si hay usuarios
  if (!users.length) {
    const err = new Error("No hay Usuarios");
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuarios encontrados",
    users,
  };
};

const getUsersByNameController = async (name) => {

  const usersByName = await User.findAll({ where: { name } });
  // Validación: verificar si el usuario existe con ese nombre
  if (usersByName.length === 0) {
    const err = new Error(`No se encontró ningún usuario con el nombre: '${name}'`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    usersByName: usersByName,
  };
};
const getUsersByEmailController = async (email) => {

  const usersByEmail = await User.findAll({ where: { email } });
  // Validación: verificar si el usuario existe con ese email
  if (usersByEmail.length === 0) {
    const err = new Error(`No se encontró ningún usuario con el email: '${email}'`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    usersByEmail: usersByEmail
  };
};
const getUserByIdController = async (id) => {

  const userById = await User.findByPk(id);
  // Validación: existencia por id
  if (!userById) {
    const err = new Error(`No se encontró el usuario con el ID: '${id}'`);
    err.status = 404;
    throw err;
  }

  /* ===== Respuesta ===== */
  return {
    message: "Usuario encontrado",
    user: userById
  };
};

const getUsersByStatusController = async (isActive) => {

  // validación de string
  if (typeof isActive === 'string') {
    if (isActive !== 'true' && isActive !== 'false') {
      const err = new Error("El parámetro 'isActive' debe ser 'true' o 'false'");
      err.status = 400;
      throw err;
    }
    isActive = isActive === 'true'; // conversion de tipo
  };

  // console.log(`El valor de estado es: ${isActive ? 'activo' : 'inactivo'} (valor recibido: ${isActive})`);

  //filtrado por isActive
  const users = await User.findAll({
    where:
      { isActive }
  });
  if (users.length === 0) {
    const err = new Error(`No hay usuarios ${isActive ? 'activos' : 'inactivos'}`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: `Usuarios ${isActive ? 'activos' : 'inactivos'} encontrados`,
    users
  };
};

const getUsersByRolController = async (role) => {

  // Validación: solo se admiten los roles definidos
  if (role !== 'user' && role !== 'admin') {
    const err = new Error("El parámetro 'role' debe ser 'user' o 'admin'");
    err.status = 400;
    throw err;
  }

  const usersByRole = await User.findAll({ where: { role } });

  // Validación: verificar si el usuario existe con ese rol
  if (usersByRole.length === 0) {
    const err = new Error(`No hay Usuarios con rol '${role}'`);
    err.status = 404;
    throw err;
  };

  /* ===== Respuesta ===== */
  return {
    message: "Usuarios encontrados",
    usersByRole: usersByRole,
  };
};

/* =======================================================
 * UPDATE: Controladores de actualización de usuarios
 * =======================================================
 * - updateUserController: actualiza todos los campos de un usuario existente.
 * - updateUserStatusController: actualiza únicamente el estado activo/inactivo del usuario.
 * 
 * Ambos controladores:
 * - Verifican la existencia del usuario por ID y lanzan error 404 si no existe.
 * - Devuelven un mensaje de éxito con el usuario actualizado.
 * - updateUserController aplica el hash de la contraseña automáticamente en el hook del modelo.
*/
const updateUserController = async (id, userData) => {

  const { name, username, gender, email, password, phone, isActive, role } = userData;

  // Validación: existencia por id
  const userById = await User.findByPk(id);
  if (!userById) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  };

  //Preparación de los campos a actualizar
  const updatedFields = {
    name,
    username,
    gender,
    email,
    password,// El hash se aplica en el hook del modelo
    phone,
    isActive,
    role,
  };

  // Actualización en la DB
  const userUpdate = await userById.update(updatedFields);

  /* ===== Respuesta ===== */
  return {
    message: "Usuario actualizado",
    user: userUpdate,
  };
};
const updateUserStatusController = async (id, isActive) => {

  // validación de string
  if (typeof isActive === 'string') {
    if (isActive !== 'true' && isActive !== 'false') {
      const err = new Error("El parámetro 'isActive' debe ser 'true' o 'false'");
      err.status = 400;
      throw err;
    }
    isActive = isActive === 'true'; // conversion de tipo
  };

  // Validación: existencia por id
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error(`No se encontró el usuario con el ID: '${id}'`);
    err.status = 404;
    throw err;
  }

  user.isActive = isActive;
  await user.save();

  return {
    message: "Usuario actualizado",
    user
  };

};


/* =======================================================
 * DELETE: Controladores de eliminación de usuarios
 * =======================================================
 * - deleteUserController: elimina físicamente un usuario de la DB  
 * - deleteSoftUserController: realiza un soft delete (marca el usuario como inactivo)
 * Ambas funciones validan la existencia del usuario y manejan errores con status code
*/

const deleteUserController = async (id) => {

  const deleteUser = await User.findByPk(id);
  // Validación: existencia del usuario por ID
  if (!deleteUser) {
    const err = new Error(`Usuario con ID: '${id}', no encontrado`);
    err.status = 404;
    throw err;
  }

  //  Eliminación del usuario PERMANENTEMENTE
  await deleteUser.destroy();

  /* ===== Respuesta ===== */
  return {
    message: `Usuario  ID:'${id}' eliminado`,
    user: deleteUser
  };
};
const deleteSoftUserController = async (id) => {

  const user = await User.findByPk(id);
  // Validación: existencia del usuario por ID
  if (!user) {
    const err = new Error(`Usuario con ID: '${id}', no encontrado`);
    err.status = 404;
    throw err;
  };

  // Validación: verificar si el usuario ya está inactivo
  if (!user.isActive) {
    const err = new Error(`El Usuario con ID: '${id}'ya se ah eliminado`);
    err.status = 400;
    throw err;
  };

  //  Eliminación del usuario LÓGICA
  user.isActive = false;
  await user.save();


  /* ===== Respuesta ===== */
  return {
    message: `Usuario  ID:'${id}' eliminado (soft delete)`,
    user
  };
};

/* const restoreUserController = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = 404;
    throw err;
  }

  if (user.isActive) {
    const err = new Error("El usuario ya está activo");
    err.status = 400;
    throw err;
  }

  await user.update({ isActive: true });

  return {
    message: "Usuario restaurado exitosamente",
    user,
  };
}; */

module.exports = {
  // Crear
  createUserController,

  // Lectura
  getAllUsersController,
  getUserByIdController,
  getUsersByNameController,
  getUsersByEmailController,
  getUsersByRolController,

  // Lectura por Estados
  getUsersByStatusController,

  // Update
  updateUserController,
  updateUserStatusController,

  // Delete
  deleteUserController, // eliminación permanente
  deleteSoftUserController, // eliminación lógica

  // restoreUserController,
}