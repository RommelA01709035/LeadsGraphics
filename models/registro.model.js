const db = require('../util/database');

module.exports = class nuevoUsuario {
    constructor(nuevoNombre, nuevoCorreo, nuevoCelular, nuevaContrasenia) {       
        console.log("Nombre:", nuevoNombre);
        console.log("Celular:", nuevoCelular);
        console.log("Correo:", nuevoCorreo);
        console.log("Contraseña:", nuevaContrasenia);

        this.nombre = nuevoNombre;
        this.celular = nuevoCelular;
        this.correo = nuevoCorreo;
        this.contrasenia = nuevaContrasenia;
        // this.rol = nuevoRol;
    }

    save() {
        // Verificar que los valores necesarios no sean undefined y ajustarlos a null si es necesario
        const nombre = this.nombre || null;
        const celular = this.celular || null;
        const correo = this.correo || null;
        const contrasenia = this.contrasenia || null;
    
        // Ejecutar la consulta SQL con los valores ajustados
        return db.execute('INSERT INTO usuario (nombre_usuario, correo, celular, Contrasena) VALUES (?, ?, ?, ?)',
            [nombre, correo, celular, contrasenia]);
    }

/*
save() {
    return bcrypt.hash(this.password, 12).then((password_cifrado) => {
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
*/
}