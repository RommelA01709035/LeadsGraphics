const db = require('../util/database');
const bcrypt = require('bcryptjs');
const pool = require('../util/database'); // Importa el módulo pool desde tu archivo de configuración de base de datos

module.exports = class Usuario {

    constructor(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioId) {

        console.log("Nombre:", usuarioNombre);
        console.log("Correo:", usuarioCorreo);
        console.log("Teléfono:", usuarioTelefono);
        console.log("ID: ", usuarioId);
        

        this.nombre_usuario = usuarioNombre || '';
        this.Correo = usuarioCorreo || '';
        this.Celular = usuarioTelefono || '';
        this.IDUsuario = usuarioId || '';
    }
    
    static createUserContructor(nombre, correo, celular, contrasena) {
        return new Usuario(nombre, correo, celular, contrasena);
    }
    
    static create(nombre, correo, celular, contrasena) {
        return bcrypt.hash(contrasena, 12)
            .then((contrasena_cifrada) => {
                return db.execute(
                    `SELECT RegistrarUsuarioYRol (?, ?, ?, ?) AS id`,
                    [nombre, correo, celular, contrasena_cifrada]
                );
            })
            .catch((error) => {
                console.log(error);
                throw Error('Nombre de usuario duplicado: Ya existe un usuario con ese nombre');
            });
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM usuario WHERE IDUsuario=?', 
            [id]);
    }
    
    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static async buscarPorNombreDeUsuario(nombre) {
        try {
            const query = `
            SELECT *
            FROM usuario
            WHERE LOWER(nombre_usuario) LIKE LOWER(?)`;
    
            const [rows, fields] = await pool.query(query, [`%${nombre}%`]);
    
            console.log('Datos de usuarios encontrados:', rows);
    
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async actualizarUsuario(usuarioId, usuarioData) {
        try {
            // Actualizar el usuario en la base de datos utilizando una consulta SQL
            const query = `
                UPDATE usuario
                SET 
                    nombre_usuario = ?,
                    Correo = ?,
                    Celular = ?
                WHERE IDUsuario = ?`;
    
            const values = [
                usuarioData.nombre_usuario,
                usuarioData.Correo,
                usuarioData.Celular,
                usuarioId
            ];
    
            await db.execute(query, values);
    
            // Devolver el usuario actualizado
            return usuarioData;
        } catch (error) {
            throw error;
        }
    }
    


    static fetchEmail(email, password){
        return db.execute('SELECT * FROM usuario WHERE Correo=?', 
        [email]);
    }
    
    static desactivar(nombre_usuario, IDUsuario) {
        return db.execute(
            `UPDATE usuario SET Habilitado = 0 WHERE nombre_usuario = ? AND IDUsuario = ?;`,
            [nombre_usuario, IDUsuario]
        ).then(() => {
            // Después de desactivar al usuario, puedes devolver los detalles actualizados del usuario
            return db.execute(`
                SELECT nombre_usuario, Habilitado, IDUsuario
                FROM usuario 
                WHERE IDUsuario = ? AND nombre_usuario = ?;
            `, [IDUsuario, nombre_usuario]);
        }).catch(error => {
            console.error('Error al desactivar usuario:', error);
            throw error;
        });
    }
    
    static reactivar(nombre_usuario, IDUsuario) {
        return db.execute(
            `UPDATE usuario SET Habilitado = 1 WHERE nombre_usuario = ? AND IDUsuario = ?;`,
            [nombre_usuario, IDUsuario]
        ).then(() => {
            // Después de reactivar al usuario, puedes devolver los detalles actualizados del usuario
            return db.execute(`
                SELECT nombre_usuario, Habilitado, IDUsuario
                FROM usuario 
                WHERE IDUsuario = ? AND nombre_usuario = ?;
            `, [IDUsuario, nombre_usuario]);
        }).catch(error => {
            console.error('Error al reactivar usuario:', error);
            throw error;
        });
    }
    
    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }

    
}