require('dotenv').config({ quiet: true });
const app = require('./src/app');
const { sequelize } = require('./src/db/database');
const { User, Product, Cart } = require('./src/models/relations');
console.log('- Modelos cargados:', Object.keys({ User, Product, Cart }));

const port = process.env.PORT || 3001;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('- DB conectada correctamente');

    await sequelize.sync({ alter: true }); // force: true
    console.log('- Tablas sincronizadas correctamente\n');

    console.log(`- Servidor corriendo en modo: ${process.env.NODE_ENV}`);

    app.listen(port, () => {
      console.log(`- Servidor escuchando en el puerto ${port}`);
    });

  } catch (error) {

    console.error('Error de conexión a PostgreSQL:', error);
    process.exit(1);
  };
};

main();