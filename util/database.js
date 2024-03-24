const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'minecraft2',
    password: 'AguaUwu2'
});

module.exports = pool.promise();