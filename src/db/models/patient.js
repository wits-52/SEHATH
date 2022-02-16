const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    fatherName: String,
    phone: Number,
    aadharNumber: Number
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = {
    Patient,
    patientSchema
};