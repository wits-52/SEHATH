const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const treatmentRoutes = require('./routes/treatment');
const { prescriptionRoutes } = require('./routes/prescription');
const { examinationRoutes } = require('./routes/examination');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use('/treatment', treatmentRoutes);
app.use('/prescription', prescriptionRoutes);
app.use('/examination', examinationRoutes);

module.exports = app;