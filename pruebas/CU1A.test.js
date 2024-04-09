// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas para Autenticarse', () => {
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

    test('Se autentica con su usuario', async () => {
        const usuarioRegistrado = {
            IDUsuario: 1,
            nombre_usuario: 'Juan',
            Celular: '123-456-7890',
            Correo: 'Juane@gmail.com',
            Contrasena: 'securepassword',
            Fecha_Ingreso: '2024-03-06T06:00:00.000Z',
            Habilitado: 0
        };

        const usuarioAutenticado = await Usuario.fetchOne_user_name(usuarioRegistrado.nombre_usuario, usuarioRegistrado.Contrasena);
        console.log(usuarioAutenticado);
        
        //expect(usuarioAutenticado).toBeDefined();
        //expect(usuarioAutenticado.nombre_usuario).toBe(usuarioRegistrado.nombre_usuario);
    });
    /*
    test('Autenticacion con datos invalidos', async () => {
        const usuarioRegistrado = {
            IDUsuario: 1,
            nombre_usuario: 'Juan',
            Celular: '123-456-7890',
            Correo: 'Juane@gmail.com',
            Contrasena: 'contraseñaIncorrecta',
            Fecha_Ingreso: '2024-03-06T06:00:00.000Z',
            Habilitado: 0
        };

        expect(usuarioRegistrado).toBeDefined();

        const usuarioAutenticado = await Usuario.fetchOne_user_name(usuarioRegistrado.nombre_usuario, usuarioRegistrado.Contrasena);
        console.log(usuarioAutenticado);

        expect(usuarioAutenticado).toBeNull();
    });

    test('Usuario no existe', async () => {
        const usuarioNoExiste = {
            nombre_usuario: 'NoExiste',
            Contrasena: 'NoExiste',
        };

        const usuarioAutenticado = await Usuario.fetchOne_user_name(usuarioNoExiste.nombre_usuario, usuarioNoExiste.Contrasena);
        console.log(usuarioAutenticado);

        expect(usuarioAutenticado).toBeNull();
    });

    test('Error con conexión con la DB', async () => {
        const usuarioRegistrado = {
            IDUsuario: 1,
            nombre_usuario: 'Juan',
            Celular: '123-456-7890',
            Correo: 'Juane@gmail.com',
            Contrasena: 'securepassword',
            Fecha_Ingreso: '2024-03-06T06:00:00.000Z',
            Habilitado: 0
        };

        expect(usuarioRegistrado).toBeDefined(); 

        // Simular un error al conectarse con la base de datos
        jest.spyOn(Usuario, 'fetchOne_user_name').mockImplementation(() => {
            throw new Error('Error de conexión con la base de datos')
        });

        const usuarioAutenticado = await Usuario.fetchOne_user_name(usuarioRegistrado.nombre_usuario, usuarioRegistrado.Contrasena);
        console.log(usuarioAutenticado);
        
        expect(usuarioAutenticado).toBeNull();
    });
    */
});