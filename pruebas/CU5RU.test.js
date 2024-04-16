// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de modificar Usuario', () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'leadgraphs'
        });
    });

    afterAll(async () => {
        await connection.end();
    });
});