const mysql = require('mysql')

require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.REACT_APP_API_KEY_DB_HOST,
    user: process.env.REACT_APP_API_KEY_DB_USER,
    password: process.env.REACT_APP_API_KEY_DB_PASSWORD,
    database: process.env.REACT_APP_API_KEY_DB_DATABASE,
    ssl: {}
})

module.exports = db;