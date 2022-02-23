const router = require('express').Router();
const bcrypt = require('bcryptjs');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const { Doctor } = require('../db/models/doctor');
const { userSchema } = require('../db/models/user');


const isAuthenticated = require('../utils/middleware/isAuthenticated');
const { validatePassword, emailValidator } = require('../utils/validators/dataValidator');

router.post('/register', async (req, res, next) => {
    const { email, password, userName } = req.body;

    if (!emailValidator(email)) {
        res.status(400)
            .json({
                error: 'invalid email passed. Please try again.'
            });
        return;
    }
    const emailAlreadyTaken = await Doctor.findOne({ email: email });
    if (emailAlreadyTaken) {
        res.status(400)
            .json({
                error: 'Email is already registered. Please login instead.'
            });
        return;
    }
    // validating userName
    if (userName.match(/\W/)) {
        res.status(400);
        res.json({
            error: `User name should have chars in 'a-z' , 'A-Z' , 0-9 , '_'`
        });
        return;
    }
    const checkUserNameExists = await Doctor.findOne({ userName: userName });
    if (checkUserNameExists) {
        res.status(400)
            .json({
                error: 'User name is already taken. Please use something else'
            });
        return;
    }
    if (!validatePassword(password).isValid) {
        res.status(400)
            .json({
                error: validatePassword(password).message
            });
        return;
    }
    const doctor = new Doctor({
        email,
        password,
        userName,
        name: req.body.name,
        speciality: req.body.speciality ? req.body.speciality.split(',').join() : [],
        designation: req.body.designation ? req.body.designation.split(',').join() : [],
        consultancyFees: req.body.consultancyFees,
        address: req.body.address,
        hospitalName: req.body.hospitalName,
        phone: req.body.phone,
        availabilitytimeStart: req.body.availabilitytimeStart,
        availabilitytimeEnd: req.body.availabilitytimeEnd,
        pincode: req.body.pincode,
        stars: 0,
        patientsTreated: 0
    });
    doctor.save()
        .then((doctorData) => {
            const { _id, password, __v,  ...data } = doctorData._doc;
            res.status(201).json({
                data: data
            });
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(400).json({
                    error: {
                        name: err.name,
                        message: err.message
                    }
                });
            } else {
                res.status(500).json({
                    error: {
                        name: err.name,
                        message: err.message
                    }
                });
            }

        });
});
router.get('/login', async(req, res, next) => {
    const { email, password } = req.body;
    const user = await Doctor.findOne({email: email});
    if (!user) {
        res.status(404);
        res.json({
            error: 'User does not exist! Please try again'
        });
        return;
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
        res.status(401);
        res.json({
            error: 'Wrong Password. Please try again.'
        });
        return ;
    }
    const token = jwt.sign({ email, id: user._id}, config.app.secretKey, { expiresIn: '1h'});
    res.json({
        data: {
            email: email,
            message: 'login Successful!',
            token: token
        }
    });

});
router.get('/profile/me', isAuthenticated, async(req, res, next) => {
    const doctor = await Doctor.findById(req.user.id); 
    if(!doctor) {
        res.status(404)
        .json({
            error: 'Doctor not found. Make sure you are logged in as a doctor.'
        });
        return;
    }
    const { _id, __v, password, ...data } = doctor._doc;
    res.json({
        data
    });
});
router.get('/profile/:userName', isAuthenticated, async(req, res, next) => {
    const user = await Doctor.findOne({userName: req.params.userName});
    if(!user) {
        res.status(404)
        .json({
            error: 'User not found. Please check username.'
        });
        return;
    }
    res.status(200)
    .json({
        data: {
            name: user.name,
            speciality: user.speciality,
            designation: user.designation,
            consultancyFees: user.consultancyFees,
            address: user.address,
            pincode: user.pincode,
            email: user.email,
            phone: user.phone,
            hospitalName: user.hospitalName,
            availabilitytimeStart: user.availabilitytimeStart,
            availabilitytimeEnd: user.availabilitytimeEnd
        }
    });
});
module.exports = router;