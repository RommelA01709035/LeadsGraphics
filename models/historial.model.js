const db = require('../util/database');

module.exports = class Historial {
    constructor(idregistro, idusuario, idhistorial, nombre_historial, accion, fecha_accion) {
        this.IDRegistro = idregistro;
        this.IDUsuario = idusuario;
        this.IDHistorial = idhistorial; // Aquí debería ser IDHistorial
        this.nombre_historial = nombre_historial;
        this.accion = accion;
        this.fecha_accion = fecha_accion;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM historial');
    }

    static fetchOne(id){
        return db.execute('SELECT * FROM historial WHERE IDRegistro=?', [id]);
    }

    static fetch(id){
        if(id){
            return this.fetchOne(id);
        } else {
            this.fetchAll();
        }
    }

    static fetchHistorialUsernames(){
        return db.execute(
            `
            SELECT * FROM historial h
            JOIN usuario u ON h.IDUsuario = u.IDUsuario
            JOIN rol_usuario ru ON u.IDUsuario = ru.IDUsuario
            JOIN roles r ON ru.IDRol = r.IDRol
            `
        )
    }
    
    static insertRegistroHistorial(IDUsuario, accion) {
        return db.execute(
            `INSERT INTO historial (IDUsuario, nombre_historial, accion, fecha_accion)
            VALUES (? ,"historial 1", ?, NOW())`,
            [IDUsuario, accion]
        );
    }
    
}