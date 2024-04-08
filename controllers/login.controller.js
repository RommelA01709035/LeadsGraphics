const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    console.log('Ruta /login');
    console.log(request.body);
    const error = request.session.error || ''; // Declarar una constante error del tipo sesion
    request.session.error = ''; // Para que no este para siempre, el usuario puede equivocarse
    response.render('login', { // Render de la plantilla login
        username: request.session.username || '',
        //registrar: false, // Variable que se le pasa al ejs para determinar su accion
        error: error,
    }); 
};

exports.post_login = (request, response, next) => {
    console.log(request.body);
    console.log('Redirigir a homepage');
    request.session.username = request.body.username;
    response.redirect('/homepage');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); 
    });
};

exports.get_signup = (request, response, next) => {
    response.render('signup'); 
};

exports.post_signup = (request, response, next) => {
    const { nombre_usuario, correo, celular, contrasena } = request.body;

    Usuario.create(nombre_usuario, correo, celular, contrasena)
        .then(result => {
            console.log("Usuario registrado correctamente");
            response.redirect('/login');
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            response.status(500).send('Error al registrar usuario');
        });
};