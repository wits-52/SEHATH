module.exports = Object.freeze({
    db: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME
    },
    app: {
        port: process.env.PORT,
        saltRound: process.env.SALTROUND,
        secretKey: process.env.AUTH_SECRET_KEY
    }
});