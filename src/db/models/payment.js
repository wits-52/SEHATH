const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paidByPatient: mongoose.SchemaTypes.ObjectId,
    paidToDoctor: mongoose.SchemaTypes.ObjectId,
    amount: Number,
    status: String,
    referenceId: String,
    timeStamp: Date
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
    Payment,
    paymentSchema
};