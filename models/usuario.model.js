const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioId) {
        console.log("Nombre:", usuarioNombre);
        console.log("Correo:", usuarioCorreo);
        console.log("Teléfono:", usuarioTelefono);
        console.log("ID: ", usuarioId);
        

        this.nombre = usuarioNombre;
        this.correo = usuarioCorreo;
        this.telefono = usuarioTelefono;
        this.id = usuarioId;
    }
    
    static createUserContructor(nombre, correo, celular, contrasena) {
        return new Usuario(nombre, correo, celular, contrasena);
    }
    
    static create(nombre, correo, celular, contrasena) {
        return bcrypt.hash(contrasena, 12).then((contrasena_cifrada) => {
            return db.execute(
                `INSERT INTO usuario (nombre_usuario, Correo, Celular, Contrasena, Habilitado) 
                VALUES (?, ?, ?, ?, 1);`,
                [nombre, correo, celular, contrasena_cifrada]
            ).then(() => {
                return db.execute(
                    "CALL insertarRolUsuarioConID(?, ?, ?)",
                    [nombre, correo, 3]
                );
            });
        }).catch((error) => {
            console.log(error);
            throw Error('Nombre de usuario duplicado: Ya existe un usuario con ese nombre');
        });
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM usuario');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM usuario WHERE id=?', 
            [id]);
    }
    
    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static fetchUser(username, password){
        return db.execute('SELECT * FROM usuario WHERE nombre_usuario=?', 
        [username]);
    }

    static fetchEmail(email, password){
        return db.execute('SELECT * FROM usuario WHERE Correo=?', 
        [email]);
    }

    static delete_logical_user(nombre_usuario, IDUsuario) {
        db.execute(
            `UPDATE usuario SET Habilitado = 0 WHERE nombre_usuario = ? AND IDUsuario = ?;`,
            [nombre_usuario, IDUsuario]
        );

        return db.execute(`
        SELECT nombre_usuario, Habilitado, IDUsuario
        FROM usuario 
        WHERE IDUsuario = ? AND nombre_usuario = ?;
        
        `,[IDUsuario, nombre_usuario])
    }

    static reactivate_user(nombre_usuario, IDUsuario){
        db.execute(
            `UPDATE usuario SET Habilitado = 1 WHERE nombre_usuario = ? AND IDUsuario = ?;`,
            [nombre_usuario, IDUsuario]
        );

        return db.execute(`
        SELECT nombre_usuario, Habilitado, IDUsuario
        FROM usuario 
        WHERE IDUsuario = ? AND nombre_usuario = ?;
        
        `,[IDUsuario, nombre_usuario])
    }
    

    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }

    
}