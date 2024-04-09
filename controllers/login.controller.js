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
    const error = request.session.error || '';
    request.session.error = '';
    response.render('signup', {
        username: request.session.username || '',
        registrar: true,
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    }); 
};

exports.post_signup = (request, response, next) => {
    const { nombre_usuario, correo, celular, contrasena } = request.body;
    const nuevo_usuario = new Usuario(request.body.username, request.body.password);
    
    Usuario.create(nombre_usuario, correo, celular, contrasena)
        .then(result => {
            console.log("Usuario registrado correctamente");
            response.redirect('/login');
        })
        .catch(error => {
            console.log(error);
            request.session.error = 'Nombre de usuario inválido.';
            response.redirect('/login');
        });
};