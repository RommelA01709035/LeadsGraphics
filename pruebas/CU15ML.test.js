// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de Modificar Lead', () => {
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

    test('fetchOne modifica Lead correcto', async () => {
        const IDLead = 42;
        const EtiquetaCambiada = "pruebaCU"
        const [rows1] = await Usuario.fetchOne_lead(IDLead);
        const [rows2] = await Usuario.fetchOne_lead_change(IDLead,EtiquetaCambiada);
        console.log(rows1); 
        console.log(rows2);
        expect(rows1.length).toBe(1);
        expect(rows1[0].Etiqueta).toBe(EtiquetaCambiada);
    });
    
    test('fetchOne no encuentra el Lead', async () => {
        const IDLead = 51;
        const [rows] = await Usuario.fetchOne_lead(IDLead);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
    
});
