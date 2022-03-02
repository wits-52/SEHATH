const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const { User } = require('../db/models/user');
const { Patient } = require('../db/models/patient');
const isAuthenticated = require('../utils/middleware/isAuthenticated');
const { validatePassword, emailValidator } = require('../utils/validators/dataValidator');

router.post('/register', isAuthenticated, async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
            .json({
                error: 'User not found. Make sure you are logged in as a user.'
            });
        return;
    }
    const patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        fatherName: req.body.fatherName,
        phone: req.body.phone,
        aadharNumber: req.body.aadharNumber,
        pincode: req.body.pincode,
        registeredByUserId: req.user.id,
        treatments: []
    });
    patient.save()
    .then(data => {
        const { _id, __v, ...responseData } = data._doc;
        res.status(201).json({
            message: 'Patient registered!',
            data: responseData
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

router.get('/all', isAuthenticated, async(req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
            .json({
                error: 'User not found. Make sure you are logged in as a user.'
            });
        return;
    }
    let patients = await Patient.find({ registeredByUser: req.user.id });
    patients = patients.map(patient => {
        const { _id, __v, registeredByUserId, ...data } = patient._doc;
        data.id = _id;
        return data;
    });
    res.status(200)
    .json(patients);
});

router.patch('/edit/:id', isAuthenticated, async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
            .json({
                error: 'User not found. Make sure you are logged in as a user.'
            });
        return;
    }
    const patient = await Patient.findById(req.params.id);
    const propertiesThatCanBeUpdated = [ 'address', 'phone', 'pincode', 'age'];
    
    let changeDetected = false;
    propertiesThatCanBeUpdated.forEach((property) => {
        if (req.body[property] && patient[property] != req.body[property]) {
            patient[property] = req.body[property];
            changeDetected = true;
        }
    });

    if (changeDetected) {
        patient.save()
        .then(patientData => {
            const { _id, __v, registeredByUserId, ...data } = patientData._doc;
            data.id = _id;
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
    } else {
        res.status(200)
        .json({
            data: {
                message: 'Already updated with the same data provided.'
            }
        });
        return;
    }
});

module.exports = router;