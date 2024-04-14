const db = require('../util/database');

module.exports = class Historial {

    constructor(idUsuarioHistorial, idHistorial, idUsuario, descripcion){
        this.IDUsuario_Historial = idUsuarioHistorial,
        this.IDHistorial = idHistorial,
        this.IDUsuario = idUsuario,
        this.Descripcion = descripcion
    };

    static fetchAll(){
        return db.execute('SELECT * FROM usuario_historial');
    };

    static fetchOne(id){
        return db.execute('SELECT * FROM usuario_historial WHERE IDUsuario_Historial = ?');
    };

    static fetch(id){
        if(id){
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    };

    

};