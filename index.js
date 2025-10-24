/* =======================================================
 * Punto de entrada de la aplicación
 * =======================================================
 * - Carga variables de entorno y la aplicación Express
 * - Conecta y sincroniza la base de datos mediante Sequelize
 * - Importa los modelos y confirma su carga
 * - Inicia el servidor en el puerto configurado
*/
require('dotenv').config({ quiet: true });
const app = require('./src/app');
const { sequelize } = require('./src/db/database');

const {
  User, Product, Category,
  Cart, CartItem,
  Order, OrderItem
} = require('./src/models/relations/relations');

// Confirmación de modelos cargados
console.log('- Modelos cargados:', Object.keys({
  User, Product, Category,
  Cart, CartItem,
  Order, OrderItem
}));

const port = process.env.PORT || 3001;

async function main() {
  try {

    await sequelize.authenticate(); // Verifica conexión a la DB
    console.log('- DB conectada correctamente');

    // Sincroniza modelos con la DB (alter: true actualiza sin borrar datos)
    await sequelize.sync({ alter: true });
    console.log('- Tablas sincronizadas correctamente\n');

    console.log(`- Servidor corriendo en modo: ${process.env.NODE_ENV}`);

    app.listen(port, () => {
      console.log(`- Servidor escuchando en el puerto ${port}`);
    });

  } catch (error) {
    console.error('Error de conexión a PostgreSQL:', error);
    process.exit(1);// Finaliza con código de error crítico
  };
};

main();