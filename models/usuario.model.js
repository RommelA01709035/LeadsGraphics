const db = require('../util/database');

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