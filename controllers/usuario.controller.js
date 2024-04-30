const Usuario = require('../models/usuario.model');
const loginController = require('../controllers/login.controller');
const Historial = require('../models/historial.model');
const { request, response } = require('express');


exports.getUsuarioPage = async (request, response, next) => {
    try {
        const [usuario, fieldData] = await Usuario.fetchAll();
        console.log(usuario);

        response.render('consultar_usuario', { 
            usuario: usuario,
            message: false, 
            username: request.session.username || '',
            csrfToken: request.csrfToken()
        });
        
        const instanciaUsuario = new Usuario("nombre", "correo", "telefono", "id");
        console.log("Instancia del modelo creada:", instanciaUsuario);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        response.status(500).send('Error al obtener usuarios');
    }
};



exports.post_delete_Usuario = (request, response, next) => { 
    console.log("Hiciste post delete");
    const { nombre, id } = request.body;
    console.log(nombre);
    console.log(id);

    Usuario.delete_logical_user(nombre, id)
    .then(([rows, fieldData]) => {
        const id_usuario = request.session.idUsuario;
        console.log(id_usuario);

        return Historial.insertRegistroHistorial(id_usuario, "Elimino a un Usuario")
    })
    .then(() => {
        console.log("Se agregó el registro al historial");
        return Usuario.fetchAll().then(([rows, fieldData]) => {
            const usuarios = rows.map(row => ({
                nombre_usuario: row.nombre_usuario, 
                Correo: row.Correo,
                Celular: row.Celular,
                IDUsuario: row.IDUsuario,
                Habilitado: row.Habilitado
            }));
            const message = `El usuario ${nombre} con ID ${id} ha sido eliminado correctamente.`;
            response.render('consultar_usuario', { 
                usuario: usuarios,
                message: message,
                csrfToken: request.csrfToken(),
                username: request.session.username || '',
                
            });
        })
    })
    
    .catch(error => {
        console.log(error);
        response.status(500).json({ message: "Error al deshabilitar" });
    });
};

exports.post_reactivate_Usuario = (request, response, next) => {
    console.log("Hiciste post reactive");
    const { nombre, id } = request.body;
    console.log(nombre);
    console.log(id);

    Usuario.reactivate_user(nombre, id)
    .then(([rows, fieldData]) => {
        const id_usuario = request.session.idUsuario;
        console.log(id_usuario);

        return Historial.insertRegistroHistorial(id_usuario, "Reactivo Usuario")
    })
    .then(([rows, fieldData]) => {

        // Obtener los usuarios actualizados después de reactivar
        return Usuario.fetchAll(); 
    })
    .then(([rows, fieldData]) => {
        
        // Renderizar la vista con los usuarios actualizados y el mensaje
        const usuarios = rows.map(row => ({
            nombre_usuario: row.nombre_usuario, 
            Correo: row.Correo,
            Celular: row.Celular,
            IDUsuario: row.IDUsuario,
            Habilitado: row.Habilitado
        }));
        const message = `El usuario ${nombre} con ID ${id} ha sido reactivado correctamente.`;
        
        response.render('consultar_usuario', { 
            usuario: usuarios,
            message: message,
            csrfToken: request.csrfToken(),
            username: request.session.username || ''
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ message: "Error al reactivar" });
    });
};


exports.getCuenta = (request, response, next) => {
    console.log('Ruta preferencias');
    console.log(request.body);
    id = request.session.idUsuario;
    username = request.session.username;
    correo = request.session.email
    console.log(id);
    console.log(username);
    console.log(correo);
    response.render('cuenta', { 
        username: request.session.username || '',
        id: id,
        correo: correo,
        csrfToken: request.csrfToken()
    });
}
/*
exports.postCambiarContrasenia = (request, response, next) => {
    console.log('Hiciste cambiar contraseña');
    id = request.session.idUsuario;
    username = request.session.username;
    correo = request.session.email
    Usuario.fetchOneUser(id, username, correo)
        .then(([usuario, fieldData]) => {
            if(usuario.length == 1) {
                console.log(usuario);
                Usuario.changePassword(usuario.IDUsuario, usuario.Correo, usuario.Contrasena)
                    .then()
                

            }
        })
        .catch()
}
*/