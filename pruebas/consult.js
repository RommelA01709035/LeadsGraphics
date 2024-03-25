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

    static fetchOne_user(IDUsuario) {
        return db.execute(
            'SELECT * FROM usuario WHERE IDUsuario=?',
            [IDUsuario]
        );
    }

    static fetchOne_Count() {
        return db.execute('SELECT COUNT(*) AS total FROM usuario');
    }
    
};
