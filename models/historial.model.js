const db = require('../util/database');

module.exports = class Historial {

    constructor(idUsuarioHistorial, idUsuario, idHistorial, descripcion){
        this.IDUsuario_Historial = idUsuarioHistorial,
        this.IDUsuario = idUsuario,
        this.IDHistorial = idHistorial,
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

    static registrarAccion(idU, idH, descripcion){
        return db.execute(`
        INSERT INTO usuario_historial (IDUsuario, IDHistorial, Desripcion, Fecha) VALUES (?,?,?,NOW())
        `, [idU, idH, descripcion]);
    };


};