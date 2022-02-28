const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    doctorUserName: String,
    userUserName: String,
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