// app.js
const bcrypt = require('bcryptjs'); // Importa bcrypt para el hashing de contraseñas
const db = require('../util/database');

module.exports = class Usuario {
    constructor(mi_username, mi_password) {
        this.username = mi_username;
        this.password = mi_password;
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_cifrado) => {
                return db.execute(
                    'INSERT INTO usuario (username, password) VALUES (?, ?)',
                    [this.username, password_cifrado]
                );
            })
            .catch((error) => {
                console.log(error);
                throw Error('Nombre de usuario duplicado: Ya existe un usuario con ese nombre');
            });
    }

    static fetchOne_lead(IDLead) {
        return db.execute(
            'SELECT * FROM leads WHERE IDLead=?',
            [IDLead]
        );
    }

    static fetchOne_lead_change(IDLead, EtiquetaCambiada) {
        return db.execute(
            'UPDATE leads SET Etiqueta = ? WHERE IDLead = ?',
            [EtiquetaCambiada, IDLead]
        );
    }

    static fetchOne_user_name(Nombre, Contrasenia) {
        return db.execute(
            'SELECT * FROM usuario WHERE nombre_usuario=? AND Contrasena=?', 
            [Nombre, Contrasenia]
        );
    }

    static fetchOne_user(IDUsuario) {
        return db.execute(
            'SELECT * FROM usuario WHERE IDUsuario=?',
            [IDUsuario]
        );
    }

    static fetchOne_user_change(IDUsuario, Correo) {//Parametros de acuerdo a los campos
        return db.execute(
            'UPDATE usuario SET Correo = ? WHERE IDUsuario = ?',
            [Correo, IDUsuario]
        );
    }

    static fetchOne_user_contrasena(IDUsuario, Contrasena) {//Parametros de acuerdo a los campos
        return db.execute(
            'UPDATE usuario SET Contrasena = ? WHERE IDUsuario = ?',
            [Contrasena, IDUsuario]
        );
    }

    static fetchOne_user_por_correo(correoElectronico) {
        return db.execute(
            'SELECT * FROM Usuario WHERE Correo = ?',
            [correoElectronico]
        );
    }

    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }

    static fetchOne_delete_lead(IDLead, Telefono) {
        return db.execute('DELETE FROM leads WHERE IDLead = ? AND Telefono = ?', [IDLead, Telefono]);
    }
};
