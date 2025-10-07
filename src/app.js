const express = require('express');
const morgan = require('morgan');
const mainRoute = require('./Routes/mainRoute');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', mainRoute);

module.exports = app;