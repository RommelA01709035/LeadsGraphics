const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) => {
    console.log('Ruta /login');
    console.log(request.body);
    const error = request.session.error || ''; 
    request.session.error = '';
    const message = request.session.message || ''; 
    request.session.message = ''; 
    response.render('login', { 
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        error: error,
        message: message, 
    }); 
};

exports.post_login = (request, response, next) => {
    Usuario.fetchUser(request.body.username)
        .then(([usuarios, fieldData]) => {
            if(usuarios.length == 1) {
                const usuario = usuarios[0];
                bcrypt.compare(request.body.password, usuario.Contrasena)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.username = usuario.username;
                            return request.session.save(err => {
                                response.redirect('/homepage');
                            });
                        } else {
                            request.session.error = 'El usuario y/o contraseña son incorrectos';
                            return response.redirect('/login');
                        }
                    }).catch(err => {
                        response.redirect('/login')
                    });
            } else {
                request.session.error = 'El usuario y/o contraseña son incorrectos';
                response.redirect('/login');
            }
        })
        .catch((error) => {console.log(error)});
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
    const nuevo_usuario = Usuario.createUserContructor(nombre_usuario, correo, celular, contrasena);
    console.log(request.body)
    Usuario.create(nombre_usuario, correo, celular, contrasena)
    .then(([rows, fieldData]) => {
        if (rows.length > 0) {
            console.log(rows);
            const new_user = rows[0]; 
            const message = `El usuario ${new_user.nombre_usuario} con \n el correo electrónico ${new_user.Correo} ha sido registrado correctamente.`;
            request.session.message = message; 
            console.log("Usuario registrado correctamente");
            response.redirect('/login');
        } else {
            throw new Error('La consulta no devolvió ningún resultado.');
        }
    })
    .catch(error => {
        console.log(error);
        request.session.error = 'Nombre de usuario inválido.';
        response.redirect('/login');
    });
};