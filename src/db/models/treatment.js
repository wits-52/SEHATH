const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    doctorId: mongoose.SchemaTypes.ObjectId,
    patientId: mongoose.SchemaTypes.ObjectId,
    appointmentId: mongoose.SchemaTypes.ObjectId,
    nextAppointmentDate: Date,
    status: String
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = {
    Treatment,
    treatmentSchema
};