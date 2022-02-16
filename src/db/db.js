const mongoose = require('mongoose');
/**
 * Function to connect to Mongo DB
 * @param {String} userName 
 * @param {String} host 
 * @param {String} database 
 * @returns {Promise}
 */
const getConnection = (userName, password, host, database) => {
    const uri = `mongodb+srv://${userName}:${password}@${host}/${database}?retryWrites=true&w=majority`;
    return mongoose.connect(uri);
};
module.exports = {
    getConnection
};