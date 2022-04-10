const examinationRoutes = require('express').Router();

const { Appointment } = require('../db/models/appointment');
const { Examination } = require('../db/models/examination');
const { Doctor } = require('../db/models/doctor');
const { User } = require('../db/models/user');
const isAuthenticated = require('../utils/middleware/isAuthenticated');

examinationRoutes.post('/new', isAuthenticated, async(req, res, next) => {
    const doctor = await Doctor.find(req.user.id);

    if (!doctor) {
        res.status(403)
        .json({
            error: 'You are not logged in as a doctor. Please log in as a doctor.'
        });
        return;
    }
    const appointment = await Appointment.findById(req.body.appointmentId);
    if (!appointment) {
        res.status(404)
        .json({
            error: 'Invalid appointmentId passed. Please provide valid id.'
        });
        return ;
    }

    const examination = new Examination({
        appointmentId: req.body.appointmentId,
        patientId: appointment.patientId,
        doctorId: req.user.id,
        temptarure: req.body.temptarure,
        systolicBP: req.body.systolicBP,
        diastolicBP: req.body.diastolicBP,
        symptoms: req.body.symptoms ? req.body.symptoms.split(',') : []
    });

    examination.save()
    .then(data => {
        const { _id, __v, appointmentId, doctorId, patientId,  ...responseData } = data._doc;
        responseData.id = _id;
        res.status(201).json({
            message: 'examination added!',
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
            return;
        }

    });
});
examinationRoutes.get('/all', isAuthenticated, async (req, res, next) => {
    
});
module.exports = {
    examinationRoutes
};