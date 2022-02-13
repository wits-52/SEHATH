const mongoose = require('mongoose');

const priscriptionSchema = new mongoose.Schema({
    appointmentId: ObjectId,
    medicine: [{
        name: String,
        dosage: String
    }],
    durationInDays: Number
});

const Priscription = mongoose.model('Priscription', priscriptionSchema);

module.exports = {
    Priscription,
    priscriptionSchema
};