const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: ObjectId,
    medicine: [{
        name: String,
        dosage: String
    }],
    durationInDays: Number
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = {
    Prescription,
    prescriptionSchema
};