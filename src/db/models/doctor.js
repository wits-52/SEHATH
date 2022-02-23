const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../../../config/config');

const doctorSchema = new mongoose.Schema({
    name: { type: String , required: (true, '{PATH} is required') },
    email: { type: String, required: (true, '{PATH} is required') },
    userName: { type: String, required: (true, '{PATH} is required') },
    password: { type: String, required: (true, '{PATH} is required') },
    speciality: { type: [String], required: (true, '{PATH} is required') },
    designation: { type: [String], required: (true, '{PATH} is required') },
    consultancyFees: { type: Number, required: (true, '{PATH} is required') },
    address: { type: String, required: (true, '{PATH} is required') },
    hospitalName: { type: String, required: (true, '{PATH} is required') },
    phone: { type: Number, required: (true, '{PATH} is required') },
    availabilitytimeStart: { type: Number, required: (true, '{PATH} is required'), min: [0, 'minimum allowed value is 0'], max: [23, 'max. allowed value is 23'] },
    availabilitytimeEnd: { type: Number, required: (true, '{PATH} is required'), min: [1, 'minimum allowed value is 1'], max: [24, 'max. allowed value is 24'] },
    pincode: { type: Number, required: (true, '{PATH} is required') },
    stars: { type: Number },
    patientsTreated: { type: Number }
});
doctorSchema.pre('save', async function() {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(config.app.saltRound))
    }

});
doctorSchema.pre('validate', function() {
    if(!this.availabilitytimeStart) {
        this.invalidate('Please provide valid value of availabilitytimeStart');
    }
    if(!this.availabilitytimeEnd) {
        this.invalidate('Please provide valid value of availabilitytimeEnd');
    }
    if(this.availabilitytimeEnd <= this.availabilitytimeStart) {
        this.invalidate('Availability start should be less than Availability end.');
    }
    // next();
});
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = {
    Doctor,
    doctorSchema
};