// test.js
const mysql = require('mysql2/promise');
const Leads = require('./consult');

describe('Pruebas para Consultar Historial', () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'JulianSQL',
            database: 'leadgraphs'
        });
    });

    afterAll(async () => {
        await connection.end();
    });
});