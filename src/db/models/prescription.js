const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: mongoose.SchemaTypes.ObjectId,
    medicine: [{
        name: String,
        notes: String
    }],
    durationInDays: Number
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = {
    Prescription,
    prescriptionSchema
};