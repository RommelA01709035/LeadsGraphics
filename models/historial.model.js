const db = require('../util/database');

module.exports = class Historial {
    constructor(idhistorial, idusuario, descripcion, fecha) {
        this.IDHistorial = idhistorial;
        this.IDUsuario = idusuario;
        this.Descripcion = descripcion;
        this.Fecha = fecha;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM historial')
    }
}