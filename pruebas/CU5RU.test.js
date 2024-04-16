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
        const correo = "alejandro@yahoo.com";
        const celular = '4426574453';
        const contrasenia = 'Alejandro123';
        const [rows1] = await Usuario.fectchUser(username);
        console.log(rows1);
        expect(rows1.length).toBe(0);

        const [rows2] = Usuario.create(username, correo, celular, contrasenia);
        console.log(rows2);
        expect(rows2.length).toBe(1);
        expect(rows2[0].correo).toBe(correo);
    });
});