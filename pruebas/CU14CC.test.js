const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de Cambiar Constraseña', () => {
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

    //Test cambiar contraseña
    test('fetchOne modifica contraseña usuario correcto', async () => {
        const IDUsuario = 12;
        const contrasenaCambiada = "samir"

        const [rows1] = await Usuario.fetchOne_user(IDUsuario);
        const contrasenaOriginal = rows1[0].Contrasena;

        await Usuario.fetchOne_user_contrasena(IDUsuario, contrasenaCambiada);

        const [rows2] = await Usuario.fetchOne_user(IDUsuario);

        expect(rows1.length).toBe(1);
        expect(rows1[0].Contrasena).toBe(contrasenaOriginal); // Comprueba la contraseña original
        
        expect(rows2.length).toBe(1);
        expect(rows2[0].Contrasena).toBe(contrasenaCambiada); // Comprueba la contraseña cambiada
    });

    test('fetchOne no encuentra el Usuario', async () => {
        const IDUsuario = 21;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });


});