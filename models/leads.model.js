const db = require('../util/database');

// Instalar el paquete csv-parser
const csvParser = require('csv-parser');

// Importar el modulo File System
const fs = require('fs');
const pool = require('../util/database'); // Importa el módulo pool desde tu archivo de configuración de base de datos


module.exports = class Leads {

    constructor(data) {
        // this.IDHistorial = data.IDHistorial;
        this.IDWorkspace = data.IDWorkspace;
        this.Telefono = data.Telefono;
        this.Nombre = data.Nombre;
        this.Valor = data.Valor;
        this.Ganado = data.Ganado;
        this.Correo = data.Correo;
        this.Etiqueta = data.Etiqueta;
        this.Compania = data.Compania;
        this.Creado = data.Creado;
        this.Hora_Creacion = data.Hora_Creacion;
        this.Fecha_Primer_Mensaje = data.Fecha_Primer_Mensaje;
        this.Hora_Primer_Mensaje = data.Hora_Primer_Mensaje;
        this.Primer_Mensaje = data.Primer_Mensaje;
        this.Fecha_Ultimo_Mensaje = data.Fecha_Ultimo_Mensaje;
        this.Hora_Ultimo_Mensaje = data.Hora_Ultimo_Mensaje;
        this.Ultimo_Mensaje = data.Ultimo_Mensaje;
        this.Estado_Lead = data.Estado_Lead;
        this.Seller_Asignado = data.Seller_Asignado;
        this.Embudo = data.Embudo;
        this.Etapa = data.Etapa;
        this.Archivado = data.Archivado;
        this.Creado_Manualmente = data.Creado_Manualmente;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM leads');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM leads WHERE IDLead = ?', [id]);
    }

    static async buscarPorNombre(nombre) {
        try {
            const query = `
            SELECT *
            FROM leads
            WHERE LOWER(nombre) LIKE LOWER(?)`;
    
            const [rows, fields] = await pool.query(query, [`%${nombre}%`]);
    
            console.log('Datos de leads encontrados:', rows);
    
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Método para guardar un nuevo lead en la base de datos
    async save() {

        this.IDWorkspace = 1;
        this.IDHistorial = 1;
        this.Creado_Manualmente = 1;

        const values = Object.values(this).map(val => (val === undefined ? null : val));

        console.log('Valores a insertar en la base de datos:', values);
    
        // Mapear los nombres de las columnas y unirlos en una cadena separada por comas
        const columns = Object.keys(this).join(', ');
    
        // Crear una cadena de marcadores de posición para los valores
        const placeholders = values.map(() => '?').join(', ');
    
        const result = await db.execute(
            `INSERT INTO leads 
            (IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.IDWorkspace, this.Telefono, this.Nombre, this.Valor, this.Ganado, this.Correo, 
                this.Etiqueta, this.Compania, this.Fecha_Primer_Mensaje, this.Hora_Primer_Mensaje, this.Primer_Mensaje, 
                this.Fecha_Ultimo_Mensaje, this.Hora_Ultimo_Mensaje, this.Ultimo_Mensaje, this.Estado_Lead, 
                this.Seller_Asignado, this.Embudo, this.Etapa, this.Archivado, this.Creado_Manualmente
            ]
        );
        return result[0]; // Devuelve el resultado de la inserción
    }

    static async importar(filePath) {
        const results = [];
        try {

            // Mapeo de nombres de columnas entre el CSV y la base de datos
            const columnMapping = {

                // 'NombreEnCSV': 'NombreEnDB'
                'Teléfono': 'Telefono',
                'Valor $': 'Valor',
                'Etiquetas': 'Etiqueta',
                'Compañia': 'Compania',

            }

            // Leer archivo CSV y procesar cada fila
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', async(row) => {
                    try{

                        // Crear una instancia de Leads con los datos de la fila del CSV
                        const lead = new Leads({
                            IDWorkspace: 1,
                            Telefono: row.Telefono,
                            Nombre: row.Nombre,
                            Valor: row.Valor,
                            Ganado: row.Ganado,
                            Correo: row.Correo,
                            Etiqueta: row.Etiqueta,
                            Compania: row.Compania,
                            Creado: row.Creado,
                            Hora_Creacion: row.Hora_Creacion,
                            Fecha_Primer_Mensaje: row.Fecha_Primer_Mensaje,
                            Hora_Primer_Mensaje: row.Hora_Primer_Mensaje,
                            Primer_Mensaje: row.Primer_Mensaje,
                            Fecha_Ultimo_Mensaje: row.Fecha_Ultimo_Mensaje,
                            Hora_Ultimo_Mensaje: row.Hora_Ultimo_Mensaje,
                            Ultimo_Mensaje: row.Ultimo_Mensaje,
                            Estado_Lead: row.Estado_Lead,
                            Seller_Asignado: row.Seller_Asignado,
                            Embudo: row.Embudo,
                            Etapa: row.Etapa,
                            Archivado: row.Archivado,
                            Creado_Manualmente: row.Creado_Manualmente,

                        });

                        // Guardar lead en la base de datos
                        await db.execute(
                            `INSERT INTO leads 
                            (IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                            [
                                this.IDWorkspace, this.Telefono, this.Nombre, this.Valor, this.Ganado, this.Correo, 
                                this.Etiqueta, this.Compania, this.Fecha_Primer_Mensaje, this.Hora_Primer_Mensaje, this.Primer_Mensaje, 
                                this.Fecha_Ultimo_Mensaje, this.Hora_Ultimo_Mensaje, this.Ultimo_Mensaje, this.Estado_Lead, 
                                this.Seller_Asignado, this.Embudo, this.Etapa, this.Archivado, this.Creado_Manualmente
                            ]
                        )
                        console.log('lead guardado correctamente: ', lead);

                        // Agregar el Lead importado a los resultados
                        results.push(lead);

                    } catch (error) {
                        console.log('Error al insertar lead', error);
                    }
            }).on('end', () => {
                console.log('Todos los datos del CSV se han insertado en la base de datos.');
            });
        } catch (error) {
            console.error('Error al importar datos desde el archivo CSV: ', error);
            throw error;
        }
        return results;
    }

    static async actualizarLead(leadId, leadData) {
        try {
            // Actualizar el lead en la base de datos utilizando una consulta SQL
            const query = `
                UPDATE leads
                SET 
                    Nombre = ?,
                    Correo = ?,
                    Compania = ?,
                    Fecha_Primer_Mensaje = ?,
                    Hora_Primer_Mensaje = ?,
                    Primer_Mensaje = ?,
                    Fecha_Ultimo_Mensaje = ?,
                    Hora_Ultimo_Mensaje = ?,
                    Ultimo_Mensaje = ?,
                    Telefono = ?,
                    Valor = ?,
                    Ganado = ?,
                    Etiqueta = ?,
                    Estado_Lead = ?,
                    Seller_Asignado = ?,
                    IDWorkspace = 1,
                    Embudo = ?,
                    Etapa = ?,
                    Archivado = ?,
                    Creado_Manualmente = 1
                WHERE IDLead = ?`;
    
            const values = [
                leadData.Nombre,
                leadData.Correo,
                leadData.Compania,
                leadData.Fecha_Primer_Mensaje,
                leadData.Hora_Primer_Mensaje,
                leadData.Primer_Mensaje,
                leadData.Fecha_Ultimo_Mensaje,
                leadData.Hora_Ultimo_Mensaje,
                leadData.Ultimo_Mensaje,
                leadData.Telefono,
                leadData.Valor,
                leadData.Ganado,
                leadData.Etiqueta,
                leadData.Estado_Lead,
                leadData.Seller_Asignado,
                leadData.Embudo,
                leadData.Etapa,
                leadData.Archivado,
                leadId
            ];
    
            await db.execute(query, values);
    
            // Devolver el lead actualizado
            return leadData;
        } catch (error) {
            throw error;
        }
    }

    static deleteLead(id){
        return db.execute('CALL deleteLead(?)',[id]);
    };
}