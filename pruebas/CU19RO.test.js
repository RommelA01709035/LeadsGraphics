//test
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

test('Registrar owner correctamente', async () => {
    const IDUsuario = 12;
    const nombre_usuario = "Ana";
    const Celular = "555-222-3333";
    const Correo = "ana@gmail.com";
    const Contrasena = "ana890";
    const Fecha_Ingreso = "2024-03-17";
    const Habilitado = 1;

    const [rows] = await Usuario.fetchOne_user(IDUsuario);

    expect(rows.length).toBe(1);
});