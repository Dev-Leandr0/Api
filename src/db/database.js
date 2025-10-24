/* ==============================================================
 * Configuración de la conexión a la DB PostgreSQL con Sequelize
 * ==============================================================
 * Carga variables de entorno para la DB, usuario y contraseña
 * Crea la conexión a la base de datos PostgreSQL usando Sequelize [host - usuario- contraseña]
 * Desactiva logging para no mostrar consultas SQL en consola
*/

require('dotenv').config();
const { Sequelize } = require('sequelize');

const { POSTGRESQL_DB, POSTGRESQL_USER, POSTGRESQL_PASS } = process.env;

const sequelize = new Sequelize(
  process.env.POSTGRESQL_DB,
  process.env.POSTGRESQL_USER,
  process.env.POSTGRESQL_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = { sequelize };