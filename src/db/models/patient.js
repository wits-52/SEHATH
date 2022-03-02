const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String , required: (true, '{PATH} is required') },
    age: { type: Number , required: (true, '{PATH} is required') },
    gender: { type: String , required: (true, '{PATH} is required') },
    address: { type: String , required: (true, '{PATH} is required') },
    fatherName: { type: String , required: (true, '{PATH} is required') },
    phone: { type: Number , required: (true, '{PATH} is required') },
    aadharNumber: { type: String , required: (true, '{PATH} is required') },
    pincode: { type: Number , required: (true, '{PATH} is required') },
    registeredByUserId: { type: mongoose.SchemaTypes.ObjectId , required: (true, '{PATH} is required') }, // store userId who registered this patient
    treatments: [mongoose.SchemaTypes.ObjectId]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = {
    Patient,
    patientSchema
};