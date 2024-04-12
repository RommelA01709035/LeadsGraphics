// test.js
const mysql = require('mysql2/promise');
const Usuario = require('./consult');

describe('Pruebas de consultar gráfica', () => {
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

    test('consulta gráfica correcto', async () => {
        const IDLead = 1
        const IDHistorial = 1
        const IDWorkspace = 1
        const Telefono = 555-1234
        const Nombre = "Pedro"
        const Valor = 1000
        const Ganado = 1
        const Correo = "pedro@gmail.com"
        const Etiqueta = "Importante"
        const Compania = "Telcel"
        const Creado = "2024-03-06"
        const Hora_Creacion = "12:00:00"
        const Fecha_Primer_Mensaje = "2024-03-06"
        const Hora_Primer_Mensaje = "12:30:00"
        const Primer_Mensaje = "Buenos días"
        const Fecha_Ultimo_Mensaje = "2024-06-03"
        const Hora_Ultimo_Mensaje = "13:00:00"
        const Ultimo_Mensaje = "Gracias hasta luego"
        const Estado_Lead = "Ended"
        const Seller_Asignado = "John"
        const Embudo = "Presales"
        const Etapa = "Contactados"
        const Archivado = true
        const Creado_Manualmente = 0

        const [rows1] = await Usuario.fetchOne_Graph(IDUsuario, IDHistorial, IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente);
        const [rows2] = await Usuario.fetchOne_user_change(IDUsuario,gmailCambiado);
        console.log(rows1); 
        console.log(rows2);
        expect(rows1.length).toBe(1);
        expect(rows1[0].Correo).toBe(gmailCambiado);
    });
    
    test('La información no está completa', async () => {
        const IDLead = 1
        const IDHistorial = 1
        const IDWorkspace = 1
        const Telefono = 555-1234
        const Nombre = "Pedro"
        const Valor = 1000
        const Ganado = 1
        const Correo = ""
        const Etiqueta = "Importante"
        const Compania = "Telcel"
        const Creado = ""
        const Hora_Creacion = "12:00:00"
        const Fecha_Primer_Mensaje = ""
        const Hora_Primer_Mensaje = "12:30:00"
        const Primer_Mensaje = ""
        const Fecha_Ultimo_Mensaje = "2024-06-03"
        const Hora_Ultimo_Mensaje = "13:00:00"
        const Ultimo_Mensaje = ""
        const Estado_Lead = "Ended"
        const Seller_Asignado = "John"
        const Embudo = "Presales"
        const Etapa = "Contactados"
        const Archivado = true
        const Creado_Manualmente = 0
        const [rows] = await Usuario.fetchOne_user(IDUsuario, IDHistorial, IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente);
        console.log(rows);
        expect(rows.length).toBe(0);
    });
});