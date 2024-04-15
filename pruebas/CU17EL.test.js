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
        const Usuario = {
            IDUsuario: 15,
        }
        
        // Verificar que exista antes de la eliminacion
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        expect(rowsBeforeDeletion.length).toBe(1);
        console.log(rowsBeforeDeletion);
        await Leads.deleteLead(Usuario.IDUsuario);
        const [rowsAfterDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsAfterDeletion);
        expect(rowsAfterDeletion.length).toBe(0);
    });

    test('Lead a eliminar no existe', async () => {
        const Usuario = {
            IDUsuario: 400,
        }
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(0);
        await Leads.deleteLead(Usuario.IDUsuario);
        const [rowsAfterDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsAfterDeletion);
        expect(rowsAfterDeletion.length).toBe(0);
    });

    test('cancela la eliminación', async () => {
        const Usuario = {
            IDUsuario: 60,
        }
        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(1);
        const [rowsAfterCancellation] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsAfterCancellation);
        expect(rowsAfterCancellation.length).toBe(1);
    });

    test('error durante la eliminación', async () => {
        const Usuario = {
            IDUsuario: 55,
        }

        /* 
        Usamos mock y spy para simular un error
        Con mock creamos una versión simulada para forzar un error
        spyOn rastrea el comportamiento de la funcion, si arroja error, devuelve el mensaje de error
        Mockear fetchOne_delete_lead para simular un error 
        */
        jest.spyOn(Leads, 'deleteLead').mockImplementation(() => {
            throw new Error('Error simulado: No se pudo eliminar el registro');
        });

        const [rowsBeforeDeletion] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsBeforeDeletion);
        expect(rowsBeforeDeletion.length).toBe(1);

        try {
            await Leads.deleteLead(Usuario.IDUsuario);
        } catch (error) {
            console.log(error.message);
        }

        const [rowsAfterError] = await Leads.fetchOne_lead(Usuario.IDUsuario);
        console.log(rowsAfterError);
        expect(rowsAfterError.length).toBe(1);
        expect(Leads.deleteLead).toHaveBeenCalledWith(Usuario.IDUsuario);
    });
});