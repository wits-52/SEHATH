const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    fatherName: String,
    phone: Number,
    aadharNumber: Number,
    pincode: Number,
    treatments: [mongoose.SchemaTypes.ObjectId]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = {
    Patient,
    patientSchema
};