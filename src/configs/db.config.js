require('dotenv').config();

module.exports = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    dialect: "mysql",
    logging: false,
    pool: {
        max: 30,
        min: 0,
        acquire: 60000,
        idle: 5000
    }
}

