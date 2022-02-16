const router = require('express').Router();

const {
    Patient
} = require('../db/models/patient');

router.get('/:id', (req, res, next) => {
    res.json({
        data: {
            message: 'hello'
        }
    })
});

router.post('/signup', (req, res, next) => {
    const patient = new Patient({
        name: 'John Doe',
        age: 27,
        gender: 'M',
        address: 'wolf st. 123',
        fatherName: 'Joe Biden',
        phone: 123456789,
        aadharNumber: 123456780000
    });
    patient.save()
        .then((savedData) => {
            res.json({
                data: savedData
            });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;