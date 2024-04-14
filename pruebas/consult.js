// app.js
const bcrypt = require('bcryptjs'); // Importa bcrypt para el hashing de contraseñas
const db = require('../util/database');
/*
module.exports = class Usuario {
    constructor(mi_username, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado) => {
                return db.execute(
                    'INSERT INTO usuario (username, password) VALUES (?, ?)',
                    [this.username, password_cifrado]
                );
            })
            .catch((error) => {
                console.log(error);
                throw Error('Nombre de usuario duplicado: Ya existe un usuario con ese nombre');
            });
    }

    static fetchOne_lead(IDLead) {
        return db.execute(
            'SELECT * FROM leads WHERE IDLead=?',
            [IDLead]
        );
    }

    static fetchOne_lead_change(IDLead, EtiquetaCambiada) {
        return db.execute(
            'UPDATE leads SET Etiqueta = ? WHERE IDLead = ?',
            [EtiquetaCambiada, IDLead]
        );
    }

    static fetchOne_user(IDUsuario) {
        return db.execute(
            'SELECT * FROM usuario WHERE IDUsuario=?',
            [IDUsuario]
        );
    }

    static fetchOne_user_change(IDUsuario, Correo) {//Parametros de acuerdo a los campos
        return db.execute(
            'UPDATE usuario SET Correo = ? WHERE IDUsuario = ?',
            [Correo, IDUsuario]
        );
    }

    static fetchOne_user_contrasena(IDUsuario, Contrasena) {//Parametros de acuerdo a los campos
        return db.execute(
            'UPDATE usuario SET Contrasena = ? WHERE IDUsuario = ?',
            [Contrasena, IDUsuario]
        );
    }

    static fetchOne_user_por_correo(correoElectronico) {
        return db.execute(
            'SELECT * FROM Usuario WHERE Correo = ?',
            [correoElectronico]
        );
    }

    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }
    
};
*/


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
        return result[0]; // Devuelve el resultado de la inserción
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
                    IDHistorial = 1,
                    IDWorkspace = 1,
                    Embudo = ?,
                    Etapa = ?,
                    Archivado = ?,
                    Creado_Manualmente = ?
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
                leadData.Creado_Manualmente,
                leadId
            ];
    
            await db.execute(query, values);
    
            // Devolver el lead actualizado
            return leadData;
        } catch (error) {
            throw error;
        }
    }
    

}
