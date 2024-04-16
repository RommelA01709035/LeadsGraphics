// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de consultar gráfica', () => {
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

    test('Consulta gráfica con información completa', async () => {
        const IDLead = 1;
        const [rows] = await Usuario.fetchOne_lead(IDLead);

        expect(rows.length).toBe(1);
    });
});
