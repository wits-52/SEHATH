require('dotenv').config({
    path: './config.env'
});
const config = require('./config/config');

const app = require('./src/app');
const db = require('./src/db/db');

db.getConnection(config.db.userName, config.db.password, config.db.host, config.db.database)
    .then((connection) => {
        console.log('DB connected!!');

        app.listen(config.app.port, console.log(`app started on port ${config.app.port}`));
    })
    .catch((err) => {
        console.log('Error Occured', err);
    });