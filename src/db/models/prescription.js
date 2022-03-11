const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.') },
    medicine: [{
        name: { type: String, required: (true, '{PATH} is required.') },
        notes: { type: String, required: (true, '{PATH} is required.') }
    }],
    prescribedByDoctorId: {type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.') },
    prescriptionForPatientId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.')},
    durationInDays: { type: Number, required: (true, '{PATH} is required') }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = {
    Prescription,
    prescriptionSchema
};