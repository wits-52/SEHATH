const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const treatmentRoutes = require('./routes/treatment');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/treatment', treatmentRoutes);

module.exports = app;