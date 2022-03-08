const treatmentRoutes = require('express').Router();

const config = require('../../config/config');
const { Doctor } = require('../db/models/doctor');
const { Patient } = require('../db/models/patient');
const { Treatment } = require('../db/models/treatment');
const { User } = require('../db/models/user');
const isAuthenticated = require('../utils/middleware/isAuthenticated');

treatmentRoutes.post('/new', isAuthenticated, async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404)
            .json({
                error: 'User not found. Make sure you are logged in as a user.'
            });
        return;
    }
    const doctor = await Doctor.find({ userName: req.body.doctorUserName });
    if (!doctor) {
        res.status(404)
            .json({
                error: 'Cannot find doctor with this username, please verify and retry.'
            });
        return;
    }
    const patient = await Patient.findById(req.body.patientId);
    if (!patient || !patient.registeredByUserId.equals(req.user.id)) {
        res.status(404)
            .json({
                error: 'Patient id provided is invalid. Please provide valid id.'
            });
        return;
    }
    const treatment = new Treatment({
        doctorUserName: req.body.doctorUserName,
        userUserId: req.user.id,
        appointmentsInTreatment: [],
        nextAppointmentDate: null,
        status: 'new', // TODO: add ENUMS: NEW, ONGOING, COMPLETE, FINISHED
        treatmentForSelf: req.body.treatmentForSelf,
        relationWithPatient: req.body.relationWithPatient,
        patientId: req.body.patientId //TODO: mak changes in User Schema to allow using data from User model when treatment for self
    });
    treatment.save()
        .then(data => {
            const { _id, __v, ...responseData } = data._doc;
            responseData.id = _id;
            res.status(201).json({
                message: 'User Created!',
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

treatmentRoutes.get('/all', isAuthenticated, async(req, res, next) => {
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(404)
        .json({
            error: 'User not found. Make sure you are logged in as a user.'
        });
        return;
    }

    let treatments = await Treatment.find({ userUserId: req.user.id });
    treatments = treatments.map(treatment => {
        const { _id, __v, ...data } = treatment._doc;
        data.id = _id;
        return data;
    });
    res.status(200)
    .json({
        data: treatments
    });
});

treatmentRoutes.patch('/edit/:id', isAuthenticated, async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
            .json({
                error: 'User not found. Make sure you are logged in as a user.'
            });
        return;
    }
    const treatment = await Treatment.findById(req.params.id);
    if(!treatment || !treatment.userUserId.equals(req.user.id)) {
        res.status(404)
        .json({
            error: 'Treatment not found. Make sure you passed correct id.'
        });
        return;
    }
    const propertiesThatCanBeUpdated = [ 'nextAppointmentDate', 'status'];
    
    let changeDetected = false;
    propertiesThatCanBeUpdated.forEach((property) => {
        if(treatment[property] instanceof Date) {
            if(req.body[property] && treatment[property].toISOString() != req.body[property]) {
                treatment[property] = req.body[property];
                changeDetected = true;
            }
        } else if (req.body[property] && treatment[property] != req.body[property]) {
            treatment[property] = req.body[property];
            changeDetected = true;
        }
    });

    if (changeDetected) {
        treatment.save()
        .then(treatmentData => {
            const { _id, __v, ...data } = treatmentData._doc;
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

module.exports = treatmentRoutes;