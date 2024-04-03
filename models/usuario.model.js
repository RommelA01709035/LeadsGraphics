const db = require('../util/database');

module.exports = class Usuario {

    constructor(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioId) {

        
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