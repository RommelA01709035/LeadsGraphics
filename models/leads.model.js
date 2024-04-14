const db = require('../util/database');

const pool = require('../util/database'); // Importa el módulo pool desde tu archivo de configuración de base de datos


module.exports = class Leads {

    constructor(data) {
        this.IDHistorial = data.IDHistorial;
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

    static fetch(id) {
        if(id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
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
        const values = Object.values(this).map(val => (val === undefined ? null : val));
    
        // Mapear los nombres de las columnas y unirlos en una cadena separada por comas
        const columns = Object.keys(this).join(', ');
    
        // Crear una cadena de marcadores de posición para los valores
        const placeholders = values.map(() => '?').join(', ');
    
        const result = await db.execute(
            `INSERT INTO leads 
            (IDHistorial, IDWorkspace, Telefono, Nombre, Valor, Ganado, Correo, Etiqueta, Compania, Fecha_Primer_Mensaje, Hora_Primer_Mensaje, Primer_Mensaje, Fecha_Ultimo_Mensaje, Hora_Ultimo_Mensaje, Ultimo_Mensaje, Estado_Lead, Seller_Asignado, Embudo, Etapa, Archivado, Creado_Manualmente) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.IDHistorial, this.IDWorkspace, this.Telefono, this.Nombre, this.Valor, this.Ganado, this.Correo, 
                this.Etiqueta, this.Compania, this.Fecha_Primer_Mensaje, this.Hora_Primer_Mensaje, this.Primer_Mensaje, 
                this.Fecha_Ultimo_Mensaje, this.Hora_Ultimo_Mensaje, this.Ultimo_Mensaje, this.Estado_Lead, 
                this.Seller_Asignado, this.Embudo, this.Etapa, this.Archivado, this.Creado_Manualmente
            ]
        );

        // Devuelve el resultado de la inserción
        return result[0];
    }

    static deleteLead(id){
        return db.execute('CALL deleteLead(?)',[id]);
    };
    
}
