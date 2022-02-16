const router = require('express').Router();

const {
    User
} = require('../db/models/user');

router.get('/:id', (req, res, next) => {
    res.json({
        data: {
            message: 'hello'
        }
    })
});

router.post('/signup', (req, res, next) => {
    const user = new User({
        name: 'John Doe',
        age: 27,
        gender: 'M',
        address: 'wolf st. 123',
        fatherName: 'Joe Biden',
        phone: 123456789,
        aadharNumber: 123456780000
    });
    user.save()
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