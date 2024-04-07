const { request, response } = require('express');
const Usuario = require('../models/usuario.model');

exports.get_homepage = (request, response, next) => {
    console.log('Ruta homepage');
    console.log(request.body);
    const error = request.session.error || ''; // Declarar una constante error del tipo sesion
    request.session.error = ''; // Para que no este para siempre, el usuario puede equivocarse
    response.render('homepage', {
        username: request.session.username || '',
        //registrar: false, // Variable que se le pasa al ejs para determinar su accion
        error: error,
    })
}