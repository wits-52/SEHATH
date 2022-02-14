const express = require('express');

const patientRoutes = require('./routes/patient');

const app = express();

app.use('/patient', patientRoutes);

module.exports = app;