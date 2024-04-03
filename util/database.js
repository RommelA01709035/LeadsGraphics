const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'leadgraphs',
    password: ''
});

module.exports = pool.promise();