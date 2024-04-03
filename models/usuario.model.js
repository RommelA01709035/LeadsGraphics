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


}