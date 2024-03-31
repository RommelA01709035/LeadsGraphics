/*
Caso de prueba para Crear Lead
test
*/

const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe("Pruebas para Crear Lead", () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "JulianSQL",
            database: "leadgraphs"
        });
    });

    afterAll(async () => {
        await connection.end();
    });
})

