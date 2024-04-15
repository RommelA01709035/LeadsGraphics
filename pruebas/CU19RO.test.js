// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de registrar usuario (owner)', () => {
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

    test('Registrar owner correcto', async () => {
        const IDUsuario = 12;
        const nombre_usuario = "Ana"
        const Celular = 555-222-3333
        const Correo = "ana@gmail.com"
        const Contrasena = "ana890"
        const Fecha_Ingreso = "2024-03-17"
        const Habilitado = 1

        const [rows1] = await Usuario.fetchOne_user(IDUsuario, nombre_usuario, Celular, Correo, Contrasena);
    });
    
    test('No se registra owner correcto', async () => {
        const IDUsuario = 12;
        const nombre_usuario = "Ana"
        const Celular = 555-222-3333
        const Correo = "ana@gmail.com"
        const Contrasena = "ana890"
        const Fecha_Ingreso = "2024-03-17"
        const Habilitado = 0

        const [rows] = await Usuario.fetchOne_user(IDUsuario, nombre_usuario, Celular, Correo, Contrasena);
    });
    
});