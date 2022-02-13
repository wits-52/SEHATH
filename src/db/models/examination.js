const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
    temprature: Number,
    systolicBP: Number,
    diastolicBP: Number,
    symptoms: [String]
});

const Examination = mongoose.model('Examination', examinationSchema);

module.exports = {
    Examination,
    examinationSchema
};