// test.js
const mysql = require('mysql2/promise');
const Leads = require('./consult');

describe('Pruebas para Eliminar Lead', () => {
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

    test('elimina lead correcto', async () => {
        const IDUsuario = 51;
        const telefonoEliminado = 552-7734;
        // Verificar que exista antes de la eliminacion
        const [rows1] = await Leads.fetchOne(IDUsuario,telefonoEliminado);
        expect(rows1.length).toBe(1);

        const [rows2] = await Leads.delete_lead(IDUsuario,telefonoEliminado);
        console.log(rows1); 
        console.log(rows2);
        expect(rows2.length).toBe(0);
        expect(rows2[0].Correo).toBe(0);
    });

    test(' no encuentra el lead', async () => {
        const IDUsuario = 200;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });

    test('cancela la eliminación', async () => {
        const IDUsuario = 200;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
});

