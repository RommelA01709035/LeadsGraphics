// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de Lead', () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'AguaUwu2',
            database: 'leadgraphs'
        });
    });

    afterAll(async () => {
        await connection.end();
    });

    test('fetchOne devuelve el Lead correcto', async () => {
        const IDLead = 42;
        const expectedUser = {
            IDLead: 42,
            IDHistorial: 7,
            Telefono: '555-3456',
            Nombre: 'Isabel',
            Valor: 4100,
            Seller_Asignado: 'Michael',
            Ultimo_Mensaje: 'Take care',
            Hora_Ultimo_Mensaje: '11:15:00'
        };
        const [rows] = await Usuario.fetchOne_lead(IDLead);
        console.log(rows); 
        expect(rows.length).toBe(1);
        expect(rows[0].IDLead).toBe(expectedUser.IDLead);
        expect(rows[0].IDHistorial).toBe(expectedUser.IDHistorial);
        expect(rows[0].Telefono).toBe(expectedUser.Telefono);
        expect(rows[0].Nombre).toBe(expectedUser.Nombre);
        expect(rows[0].Valor).toBe(expectedUser.Valor);
        expect(rows[0].Seller_Asignado).toBe(expectedUser.Seller_Asignado);
        expect(rows[0].Ultimo_Mensaje).toBe(expectedUser.Ultimo_Mensaje);
        expect(rows[0].Hora_Ultimo_Mensaje).toBe(expectedUser.Hora_Ultimo_Mensaje);
    });
    
    test('fetchOne no encuentra el Lead', async () => {
        const IDLead = 51;
        const [rows] = await Usuario.fetchOne_lead(IDLead);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
    
});
