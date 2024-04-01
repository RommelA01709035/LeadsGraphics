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

    test('modifica usuario correcto', async () => {
        const IDUsuario = 12;
        const gmailCambiado = "ana123@yahoo.com"
        const [rows1] = await Usuario.fetchOne_user(IDUsuario);
        const [rows2] = await Usuario.fetchOne_user_change(IDUsuario,gmailCambiado);
        console.log(rows1); 
        console.log(rows2);
        expect(rows1.length).toBe(1);
        expect(rows1[0].Correo).toBe(gmailCambiado);
    });
    
    test(' no encuentra el Usuario', async () => {
        const IDUsuario = 21;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });

    test('cancela la modificacion', async () => {
        const IDUsuario = 21;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
    
});
