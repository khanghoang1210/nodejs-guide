const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-app',
    password: '12102003'
});

module.exports = pool.promise();