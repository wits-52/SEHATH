const prescriptionRoutes = require('express').Router();

const { Doctor } = require('../db/models/doctor');
const { Prescription } = require('../db/models/prescription');
const { Appointment } = require('../db/models/appointment');
const { Patient } = require('../db/models/patient');
const isAuthenticated = require('../utils/middleware/isAuthenticated');
// const mongoose = require('mongoose');

prescriptionRoutes.post('/new', isAuthenticated, async (req, res, next) => { // TODO: validate appointment once done
    if(req.headers['content-type'] !== 'application/json') {
        res.status(400)
        .json({
            error: 'The content-type should be \'application-json\''
        });
        return;
    }
    const doctor = await Doctor.findById(req.user.id);
    if(!doctor) {
        res.status(404)
        .json({
            error: 'Doctor not found. Please make sure you are logged in as a doctor.'
        });
        return;
    }
    let patient = undefined;
    if (req.body.prescriptionForPatientId) {
        patient = await Patient.findById(req.body.prescriptionForPatientId);
    }
    if (!patient) {
        res.status(404)
        .json({
            error: 'Patient not found. Please provide valid data.'
        });
        return;
    }
    let appointment = undefined;
    if (req.body.appointmentId){
        appointment = await Appointment.findById(req.body.appointmentId);
    }
    if(!appointment) {
        res.status(404)
        .json({
            error: 'Invalid appointmentId. Please provide valid data.'
        });
        return;
    }
    const prescription = await new Prescription({
        appointmentId: req.body.appointmentId,
        medicine: req.body.medicine,
        prescribedByDoctorId: req.user.id,
        durationInDays: req.body.durationInDays,
        prescriptionForPatientId: req.body.prescriptionForPatientId
    });
    prescription.save()
    .then(data => {
        const {__v, _id, ...responseData} = data._doc;
        responseData.id = _id;
        res.status(200)
        .json({
            data: responseData
        });
        return;
    })
    .catch(err => {
        
        if (err.name === 'ValidationError') {
            res.status(400).json({
                error: {
                    name: err.name,
                    message: err.message
                }
            });
            return;
        } else {
            res.status(500).json({
                error: {
                    name: err.name,
                    message: err.message
                }
            });
            return; // TODO: add return statement in all catch block with 500 error
        }
    });
});
prescriptionRoutes.get('/:id', isAuthenticated, async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);
    if(!prescription) {
        res.status(404)
        .json({
            error: 'Prescription not found! Please check if id is valid.'
        });
        return;
    }
    const patient = await Patient.findById(prescription.prescriptionForPatientId);
    if (!prescription.prescribedByDoctorId.equals(req.user.id) && !patient.registeredByUserId.equals(req.user.id)) {
        res.status(404)
        .json({
            error: 'Prescription not found!! Please check if correct id is requested'
        });
        return;
    }
    const { __v, prescribedByDoctorId, prescriptionForPatientId, _id, ...responseData } = prescription._doc;
    responseData.id = _id;
    res.status(200)
    .json({
        data: responseData
    });
});
prescriptionRoutes.delete('/:id', isAuthenticated, async (req, res, next) => {
    const doctor = await Doctor.findById(req.user.id);

    if(!doctor) {
        res.status(400)
        .json({
            error: 'Authetication failed. Please check if you are logged in as Doctor.'
        });
        return;
    }
    const prescription = await Prescription.findById(req.params.id);
    if(!prescription) {
        res.status(404)
        .json({
            error: 'Presciption not found. Please check the id.'
        });
    }
    prescription.deleteOne({ id: req.params.id })
    .then(data => {
        const { __v, prescribedByDoctorId, prescriptionForPatientId, _id, ...responseData } = data._doc;
        data.id = _id;
        res.status(202)
        .json({
            data: responseData
        });
        return;
    })
    .catch(err => {

        if (err.name === 'ValidationError') {
            res.status(400).json({
                error: {
                    name: err.name,
                    message: err.message
                }
            });
            return;
        } else {
            res.status(500).json({
                error: {
                    name: err.name,
                    message: err.message
                }
            });
            return; // TODO: add return statement in all catch block with 500 error
        }
    });
});
// TODO: add edit method for /:id , but for now use delete and create instead
module.exports = { prescriptionRoutes };    