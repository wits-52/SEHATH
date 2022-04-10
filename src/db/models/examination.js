const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.') },
    doctorId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.')},
    userId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.')},
    patientId: { type: mongoose.SchemaTypes.ObjectId, required: (true, '{PATH} is required.') },
    temprature: { type: Number/*, required: (true, '{PATH} is required')*/ },
    systolicBP: { type: Number/*, required: (true, '{PATH} is required')*/ },
    diastolicBP: { type: Number/*, required: (true, '{PATH} is required')*/ },
    symptoms: [String]
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = {
    Examination,
    examinationSchema
};