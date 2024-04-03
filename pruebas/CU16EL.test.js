// test.js
const mysql = require('mysql2/promise');
const Leads = require('./consult');

describe('Pruebas para Eliminar Lead', () => {
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

    test('elimina lead correcto', async () => {
        const IDUsuario = 51;
        const telefonoEliminado = '552-7734';
        // Verificar que exista antes de la eliminacion
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario);
        expect(rowsBeforeDeletion.length).toBe(1);
        console.log(rowsBeforeDeletion);
        await Leads.delete_lead(IDUsuario,telefonoEliminado);

        const [rowsAfterDeletion] = await Leads.fetchOne_lead(IDUsuario);
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
        const telefonoEliminado = 'telefono_inexistente';
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(1);

        // Simular un error durante la eliminacion
        try {
            await Leads.delete_lead(IDUsuario,telefonoEliminado);
        } catch (error) {
            console.log(error);
        }

        const [rowsAfterError] = await Leads.fetchOne_lead(IDUsuario);
        console.log(rowsAfterError);
        expect(rowsAfterError.length).toBe(1);
    });
});

