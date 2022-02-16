const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    speciality: [String],
    designation: [String],
    consultancyFees: Number,
    address: String,
    hospital: String,
    phone: Number,
    availabilitytimeStart: Date,
    availabilitytimeEnd: Date,
    pincode: Number,
    stars: Number,
    patientsTreated: Number
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = {
    Doctor,
    doctorSchema
};