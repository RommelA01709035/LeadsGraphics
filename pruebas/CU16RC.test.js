const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de Recuperación de Contraseña', () => {
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



    test('fetchOne encuentra el Usuario por correo electrónico', async () => {
        const correoElectronico = 'karla@gmail.com';

        const [rows1] = await Usuario.fetchOne_user_por_correo(correoElectronico);

        // Comprueba si se encontró algún usuario con el correo electrónico dado
        expect(rows1.length).toBeGreaterThan(0);

        expect(rows1[0].Correo).toBe(correoElectronico);
    });

    test('fetchOne no encuentra el Usuario por correo electrónico', async () => {
        const correoElectronico = 'correo@inexistente.com';

        const [rows] = await Usuario.fetchOne_user_por_correo(correoElectronico);

        // Comprueba si no se encontró ningún usuario con el correo electrónico dado
        expect(rows.length).toBe(0);
    });

});
