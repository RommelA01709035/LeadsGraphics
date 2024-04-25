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
        this.Estatus = data.Estatus;
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

        // Definir un mapa para mapear nombres de columna del CSV a nombres de columna de la base de datos
        const columnMapping = {

            // Encabezado en CSV: Encabezado en MySQL
            'Telefono': '_0',
            'Nombre': '_1',
            'Valor $': '_2',
            'Ganado': '_3',
            'Correo': '_4',
            'Etiqueta': '_5',
            'Compania': '_6',
            'Creado': '_7',
            'Hora de creación': '_8',
            'Fecha de primer mensaje': '_9',
            'Hora del primer mensaje': '_10',
            'Primer mensaje': '_11',
            'Fecha de último mensaje': '_12',
            'Hora de último mensaje': '_13',
            'Último mensaje': '_14',
            'Status': '_15',
            'Estado de Lead': '_16',
            'Asignado a': '_17',
            'Embudo': '_18',
            'Etapa': '_19',
            'Archivado': '_20',
            'Creado manualmente': '_21',

        }

        // Función para convertir fecha de CSV al formato de MySQL
        function convertirFecha(fechaCSV) {
            if (!fechaCSV) {

                // Si la fecha es undefined o null, devolver null
                return null;
            }
            const [dia, mes, año] = fechaCSV.split('/');
            return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        }

        // Función para convertir hora de CSV al formato de MySQL
        function convertirHora(horaCSV) {
            if (!horaCSV) {

                // Si la hora es nula o no está definida, devolver null
                return null;
            }

            // Dividir la hora en partes (horas, minutos y segundos)
            const [hora, minuto, segundo] = horaCSV.split(':');

            // Formatear la hora a HH:MM:SS
            return `${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}:${segundo.padStart(2, '0')}`;
        }
        
        try {
            
            fs.createReadStream(filePath)
            .pipe(csvParser({
                headers: true,
            }))
            .on('headers', (headers) => {

                // Obtener la primera fila de encabezados
                const firstRow = headers[0];
                
                // Arreglo de los encabezados CSV esperados
                const expectedHeaders = Object.keys(columnMapping);

                // Comprobar si los encabezados de la primera fila coinciden con los esperados
                const areHeadersMatching = expectedHeaders.every(header => firstRow.includes(header));

                // Determinar si se debe omitir la primera línea
                const skipLines = areHeadersMatching ? 1 : 0;

                // Imprimirá 1 si los encabezados coinciden, de lo contrario, imprimirá 0
                console.log('skipLines:', skipLines);
            })
            .on('data', async(row) => {
                try{
                    console.log('Fila del CSV:', row);
                
                    // Convertir valores "Si" y "No" a 1 y 0 respectivamente
                    for (const key in row) {
                        if (row[key] === 'No' || 
                            row[key] === 'NO' || 
                            row[key] === 'false' || 
                            row[key] === 'FALSE') {

                            row[key] = '0';
                        } 
                        else if (row[key] === 'Si' ||
                                row[key] === 'SI' || 
                                row[key] === 'true' ||
                                row[key] === 'TRUE') {
                            row[key] = '1';
                        }                       
                        else if (row[key] === '') {
                            
                            // Manejar campos vacíos asignando un valor predeterminado para la db
                            row[key] = null;
                        }
                        console.log(`Valor de ${key} después de la conversión:`, row[key]);
                    }

                    
                    console.log('Fila del CSV después de la conversión:', row);


                    // Convertir las fechas al formato MySQL DATE
                    const fechaCreado = convertirFecha(row[columnMapping['Creado']]);

                    const fechaPrimerMensaje = convertirFecha(row[columnMapping['Fecha de primer mensaje']]);

                    const fechaUltimoMensaje = convertirFecha(row[columnMapping['Fecha de último mensaje']]);

                     // Convertir las horas al formato MySQL TIME
                    const HoraCreado = convertirHora(row[columnMapping['Hora de creación']]);

                    const HoraPrimerMensaje = convertirHora(row[columnMapping['Hora del primer mensaje']]);

                    const HoraUltimoMensaje = convertirHora(row[columnMapping['Hora de último mensaje']]);

                    console.log('Mapeo de columnas:', columnMapping);
                    console.log('Encabezados del CSV:', Object.keys(row));
                    
                    // Crear una instancia de Leads con los datos de la fila del CSV
                    const lead = {
                        IDWorkspace: 1,
                        Telefono: row[columnMapping['Telefono']] || null,
                        Nombre: row[columnMapping['Nombre']] || null,
                        Valor: row[columnMapping['Valor $']] || null,
                        Ganado: row[columnMapping['Ganado']] || null,
                        Correo: row[columnMapping['Correo']] || null,
                        Etiqueta: row[columnMapping['Etiquetas']] || null,
                        Compania: row[columnMapping['Compañia']] || null,
                        Creado: row[columnMapping['Creado']] || null,
                        Hora_Creacion: row[columnMapping['Hora de creacion']] || null,
                        Fecha_Primer_Mensaje: row[columnMapping['Fecha de primer mensaje']] || null,
                        Hora_Primer_Mensaje: row[columnMapping['Hora de primer mensaje']] || null,
                        Primer_Mensaje: row[columnMapping['Primer mensaje']] || null,
                        Fecha_Ultimo_Mensaje: row[columnMapping['Fecha de último mensaje']] || null,
                        Hora_Ultimo_Mensaje: row[columnMapping['Hora de último mensaje']] || null,
                        Ultimo_Mensaje: row[columnMapping['Último mensaje']] || null,
                        Estatus: row[columnMapping['Status']] || null,
                        Estado_Lead: row[columnMapping['Estado de Lead']] || null,
                        Seller_Asignado: row[columnMapping['Asignado a']] || null,
                        Embudo: row[columnMapping['Embudo']] || null,
                        Etapa: row[columnMapping['Etapa']] || null,
                        Archivado: row[columnMapping['Archivado']] || null,
                        Creado_Manualmente: row[columnMapping['Creado manualmente']] || null,

                    };

                    // Guardar lead en la base de datos con consulta de sql
                    const query = `
                    INSERT INTO leads 
                    (IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Creado, Hora_Creacion, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estatus, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    
                    const values = [
                        lead.IDWorkspace, 
                        lead.Telefono, 
                        lead.Nombre, 
                        lead.Valor, 
                        lead.Ganado, 
                        lead.Correo, 
                        lead.Etiqueta, 
                        lead.Compania, 
                        fechaCreado, 
                        HoraCreado, 
                        fechaPrimerMensaje, 
                        HoraPrimerMensaje, 
                        lead.Primer_Mensaje, 
                        fechaUltimoMensaje, 
                        HoraUltimoMensaje, 
                        lead.Ultimo_Mensaje, 
                        lead.Estatus, 
                        lead.Estado_Lead, 
                        lead.Seller_Asignado, 
                        lead.Embudo, 
                        lead.Etapa, 
                        lead.Archivado, 
                        lead.Creado_Manualmente
                    ];
                    
                    await db.execute(query, values);
                    
                    //console.log('Query:', query);
                    console.log('Values:', values);

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