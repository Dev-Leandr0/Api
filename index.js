require('dotenv').config({ quiet: true });
const app = require('./src/app');
const mongoose = require('./src/db/database');


const port = process.env.PORT || 3001;

mongoose.connection.once('open', () => {
  console.log('DB conectada correctamente');
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});