const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    userId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    patientId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    priscriptionId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    examinationId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    treatmentId: mongoose.SchemaTypes.ObjectId,
    date: Date,
    status: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {
    Appointment,
    appointmentSchema
};