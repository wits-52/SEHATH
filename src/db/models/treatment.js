const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    doctorUserName: { type: String , required: (true, '{PATH} is required') },
    userUserId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')},
    appointmentsInTreatment: [mongoose.SchemaTypes.ObjectId],
    nextAppointmentDate: Date,
    status: { type: String , required: (true, '{PATH} is required') },
    treatmentForSelf: { type: Boolean, required: (true, '{PATH} is required') },
    relationWithPatient: { type: String , required: (true, '{PATH} is required') },
    patientId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required')}
});

treatmentSchema.pre('save', async function() {
    if (this.treatmentForSelf !== undefined && this.treatmentForSelf === true) {
        this.relationWithPatient = 'self';
    }
});

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = {
    Treatment,
    treatmentSchema
};