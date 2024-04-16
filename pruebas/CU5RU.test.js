// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de registrarse', () => {
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

    test('Usuario se registra correctamente', async () => {
        const username = 'Alejandro';
        const gmail = "alejandro@yahoo.com";
        const telefono = '4426574453';
        const [rows1] = await Usuario.fetchOne_user(IDUsuario);
        const [rows2] = await Usuario.fetchOne_user_change(IDUsuario,gmailCambiado);
        console.log(rows1); 
        console.log(rows2);
        expect(rows1.length).toBe(1);
        expect(rows1[0].Correo).toBe(gmailCambiado);
    });
});