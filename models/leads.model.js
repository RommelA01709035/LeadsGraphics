const db = require('../util/database');

module.exports = class Leads {

    constructor(leadNombre, leadCorreo, leadCompania, leadTelefono) {

        console.log("Nombre:", leadNombre);
        console.log("Correo:", leadCorreo);
        console.log("Compañia:", leadCompania);
        console.log("Teléfono:", leadTelefono);
        
        this.nombre = leadNombre;
        this.correo = leadCorreo;
        this.compania = leadCompania;
        this.telefono = leadTelefono;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM leads');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM leads WHERE id=?', 
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