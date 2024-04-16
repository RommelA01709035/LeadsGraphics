const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de reactivar usuario', () => {
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

    test('Reactiva usuario correctamente', async () => {
        const IDUsuario = 12;
    
        await Usuario.reactive_user(IDUsuario);
    
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
    
        expect(rows.length).toBe(1);
        expect(rows[0].Habilitado).toBe(1);
    });
    
    test('No se reactivó el usuario correctamente', async () => {
        const IDUsuario = 12;
    
        await Usuario.eliminate_user(IDUsuario);
    
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
    
        expect(rows.length).toBe(1);
        expect(rows[0].Habilitado).toBe(0);
    });
});
