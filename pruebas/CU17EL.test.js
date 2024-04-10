// test.js
const mysql = require('mysql2/promise');
const Leads = require('./consult');

describe('Pruebas para Eliminar Lead', () => {
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

    test('elimina lead correcto', async () => {
        const IDUsuario = 51;
        const telefonoEliminado = '552-7734';
        // Verificar que exista antes de la eliminacion
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario);
        expect(rowsBeforeDeletion.length).toBe(1);
        console.log(rowsBeforeDeletion);
        await Leads.fetchOne_delete_lead(IDUsuario,telefonoEliminado);

        const [rowsAfterDeletion] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsAfterDeletion);
        expect(rowsAfterDeletion.length).toBe(0);
    });

    test('Lead a eliminar no existe', async () => {
        const IDUsuario = 400;
        const telefonoEliminado = '552-7734';
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario, telefonoEliminado);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(0);
        
        await Leads.fetchOne_delete_lead(IDUsuario,telefonoEliminado);

        const [rowsAfterDeletion] = await Leads.fetchOne_lead(IDUsuario, telefonoEliminado);
        console.log(rowsAfterDeletion);
        expect(rowsAfterDeletion.length).toBe(0);
    });

    test('cancela la eliminación', async () => {
        const IDUsuario = 60;
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(1);
        const [rowsAfterCancellation] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsAfterCancellation);
        expect(rowsAfterCancellation.length).toBe(1);
    });

    test('error durante la eliminación', async () => {
        const IDUsuario = 55;
        const telefonoEliminado = '552-6789';
        // Usamos mock y spy para simular un error
        // Con mock creamos una versión simulada para forzar un error
        // spyOn rastrea el comportamiento de la funcion, si arroja error, devuelve el mensaje de error

        // Mockear fetchOne_delete_lead para simular un error
        jest.spyOn(Leads, 'fetchOne_delete_lead').mockImplementation(() => {
            throw new Error('Error simulado: No se pudo eliminar el registro');
        });

        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(1);

        try {
            await Leads.fetchOne_delete_lead(IDUsuario, telefonoEliminado);
        } catch (error) {
            console.log(error.message);
        }

        const [rowsAfterError] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsAfterError);
        expect(rowsAfterError.length).toBe(1);
        expect(Leads.fetchOne_delete_lead).toHaveBeenCalledWith(IDUsuario, telefonoEliminado);
    });
});