/*
Caso de prueba para Crear Lead
test
*/

const mysql = require('mysql2/promise');
const Leads = require('./consult');

describe("Pruebas para Crear Lead", () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "JulianSQL",
            database: "leadgraphs"
        });
    });

    afterAll(async () => {
        await connection.end();
    });

    test('crea lead correcto', async () => {
        const IDUsuario = 101;
        const IDHistorial = 7;
        const IDWorkspace = 1;
        const Telefono = '629-5927';
        const Nombre = 'Ian';
        const Correo = 'ian@gmail.com';
        const Compania = 'Megacable';
        const Creado = '2024-03-07';
        const HoraCreado = '13:00:00';
        const Seller = 'John';
        const CreadoManual = '1';
        const expectedUser = {
            IDUsuario: 101,
            IDHistorial: 7,
            IDWorkspace: 1,
            Telefono: '629-5927',
            Nombre: 'Ian',
            Correo: 'ian@gmail.com',
            Compania: 'Megacable',
            Creado: '2024-03-07',
            HoraCreado: '13:00:00',
            Seller: 'John',
            CreadoManual: '1',
        }; 

        const [rows] = await Leads.create_lead(IDUsuario, IDHistorial, IDWorkspace, Telefono, Nombre, Correo, Compania, Creado, HoraCreado, Seller, CreadoManual);
        console.log(rows);
        expect(rows.length).toBe(1);

    });
});

