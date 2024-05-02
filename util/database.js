const mysql = require('mysql2');

const { Pool } = require('pg');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'leadgraphs',
    password: 'taco'
});

module.exports = pool.promise();
