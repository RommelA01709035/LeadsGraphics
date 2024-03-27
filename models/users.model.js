const db = require('../util/database');

module.exports = class Usuario {
    constructor(mi_username, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    static logical_delete_user(IDUsuario, Habilitado, nombre_usuario) {
        return db.execute(
            'UPDATE usuario SET Habilitado = ? WHERE IDUsuario = ? AND nombre_usuario = ?',
            [Habilitado, IDUsuario, nombre_usuario]
        );
    }

    static fetchOne_user(id) {
        return db.execute('SELECT * FROM usuario WHERE id=?', 
            [id]);
    }
    
    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }
    
};
