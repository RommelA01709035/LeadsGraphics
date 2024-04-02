const db = require('../util/database');

module.exports = class Usuario {

    constructor(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioId) {

        console.log("Nombre:", leadNombre);
        console.log("Correo:", leadCorreo);
        console.log("Teléfono:", leadTelefono);
        console.log("ID: ", leadId);
        
        this.nombre = leadNombre;
        this.correo = leadCorreo;
        this.telefono = leadTelefono;
        this.id = leadId;
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