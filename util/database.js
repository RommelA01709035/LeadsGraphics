const mysql = require('mysql2');

const { Pool } = require('pg');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'leadgraphs',
    password: 'JulianSQL'
});

module.exports = pool.promise();
