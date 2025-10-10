const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB } = process.env;

const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;


mongoose.connect(mongoUrl)
  .then(() => console.log('✅ Conexión a MongoDB Atlas establecida'))
  .catch((error) => console.error('❌ Error al conectar con MongoDB Atlas:', error));
module.exports = mongoose;