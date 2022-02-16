const express = require('express');

const userRoutes = require('./routes/user');

const app = express();

app.use('/user', userRoutes);

module.exports = app;