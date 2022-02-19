const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const {
    User
} = require('../db/models/user');
const isAuthenticated = require('../utils/middleware/isAuthenticated');
const { validatePassword, emailValidator } = require('../utils/validators/dataValidator');
// TODO: move errors out to a file and create ENUM
router.get('/profile/:userName', isAuthenticated, async(req, res, next) => {
    const user = await User.findOne({userName: req.params.userName});

    res.status(200)
    .json({
        data: {
            name: user.name,
            address: user.address,
            pincode: user.pincode,
            email: user.email,
            phone: user.phone
        }
    });
});

router.post('/signup', async (req, res, next) => {
    const { name, email, address, phone, pincode, userName, password } = req.body;
    const checkEmailExists = await User.findOne({
        email: email
    });
    const checkUserNameExists = await User.findOne({
        userName: userName
    });
    if (checkUserNameExists || userName.match(/\W/)) {
        res.status(400);
        if (userName.match(/\W/)) {
            res.json({
                error: `User name should have chars in 'a-z' , 'A-Z' , 0-9 , '_'`
            });
            return;
        } else {
            res.json({
                error: 'This user name is already taken. Please select something else'
            });
            return;
        }
    }
    if (!emailValidator(email)) {
        res.status(400);
        res.json({
            error: 'invalid email. Please enter valid data.'
        });
        return;
    }
    if (checkEmailExists) {
        res.status(400);
        res.json({
            error: 'email alread taken! Please login instead or use a different email'
        });
        return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        res.status(400);
        res.json({
            error: passwordValidation.message
        });
        return;
    }
    const user = new User({
        name,
        email,
        address,
        phone,
        pincode,
        userName,
        password
    });
    user.save()
        .then(data => {
            const { _id, __v, password, ...responseData } = data._doc;
            res.json({
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
router.get('/login', async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
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
    const token = jwt.sign({ email, password, id: user._id}, config.app.secretKey, { expiresIn: '1h'});
    res.json({
        data: {
            email: email,
            message: 'login Successful!',
            token: token
        }
    });

});
module.exports = router;