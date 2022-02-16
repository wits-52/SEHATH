const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: mongoose.SchemaTypes.ObjectId,
    patientId: mongoose.SchemaTypes.ObjectId,
    priscriptionId: mongoose.SchemaTypes.ObjectId,
    examinationId: mongoose.SchemaTypes.ObjectId,
    treatmentId: mongoose.SchemaTypes.ObjectId,
    date: Date,
    status: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {
    Appointment,
    appointmentSchema
};