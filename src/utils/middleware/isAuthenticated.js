const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    const [ tokenType, tokenValue ] = token.split(' ');
    if(!token || tokenType !== 'Bearer' || !tokenValue) {
        res.status(403);
        res.json({
            error: 'Please provide valid token in headers.'
        });
        return;
    }
    try{
        req.user = jwt.verify(tokenValue, config.app.secretKey);
        next();
    } catch (err) {
        res.status(401).json({
            error: {
                message: 'Invalid token',
                data: err
            }
        });
    }
    
};

module.exports = isAuthenticated;