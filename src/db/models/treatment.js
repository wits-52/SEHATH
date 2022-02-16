const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    doctorId: mongoose.SchemaTypes.ObjectId,
    userId: mongoose.SchemaTypes.ObjectId,
    appointmentId: [mongoose.SchemaTypes.ObjectId],
    nextAppointmentDate: Date,
    status: String,
    treatmentForSelf: Boolean,
    relationWithPatient: String,
    patientId: mongoose.SchemaTypes.ObjectId
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = {
    Treatment,
    treatmentSchema
};