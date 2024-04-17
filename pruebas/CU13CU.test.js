// test.js
const mysql = require('mysql2/promise');
const Usuario = require('../models/usuario.model');

describe('Pruebas de Consultar Usuario', () => {
    let connection;

    beforeAll(async () => { //conecto bd
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'AguaUwu2',
            database: 'leadgraphs'
        });
    });

    afterAll(async () => { //cierro bd
        await connection.end();
    });

   /* test('fetchOne devuelve el Usuario correcto', async () => { //caso de prueba
        const IDUsuario = 12;
        const expectedUser = {
            IDUsuario: 12,
            nombre_usuario: "Ana",
            Celular: "555-222-3333",
            Correo: "ana123@gmail.com",
            Fecha_Ingreso: new Date("2024-03-17T06:00:00.000Z"), // Crear objeto Date
            Habilitado: 1
        };//data usada
    
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows); 
        //comparación en el caso de prueba
        expect(rows.length).toBe(1);
        expect(rows[0].IDUsuario).toBe(expectedUser.IDUsuario);
        expect(rows[0].Nombre).toBe(expectedUser.Nombre);
        expect(rows[0].Celular).toBe(expectedUser.Celular);
        expect(rows[0].Fecha_Ingreso.getTime()).toBe(expectedUser.Fecha_Ingreso.getTime());
        expect(rows[0].Habilitado).toBe(expectedUser.Habilitado);
    });
    
    test('fetchOne no encuentra el Usuario', async () => {
        const IDUsuario = 21;
        const [rows] = await Usuario.fetchOne_user(IDUsuario);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
    */
   
    test('fetchOne detecta solo a un usuario detectado', async () => {
        const [rows] = await Usuario.fetchAll();
        console.log(rows);
        expect(rows.length).toBe(20);
    });

    test('FetchAll detectar numero de usuarios', async () => {
        const [rows] = await Usuario.fetchOne_Count();
        console.log(rows);
        expect(rows.length).toBe(20);
    })
});
