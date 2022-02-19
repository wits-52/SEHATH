const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../../../config/config');

const userSchema = new mongoose.Schema({
    name: { type: String, required: (true, 'name is required') },
    email: { type: String, required: (true, 'email is required') },
    userName: { type: String, required: (true, 'userName is required'), maxlength: [20, 'max allowed length for user name is 20'] },
    password: { type: String, required: (true, 'password is required') },
    address: String,
    phone: { type: Number, required: (true, 'phone is required') }, // TODO: make phone a string
    pincode: { type: Number, required: (true, 'pincode is required') }
});


userSchema.pre('save', async function() {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(config.app.saltRound))
    }

});

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    userSchema
};