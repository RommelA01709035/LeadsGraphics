const { request, response } = require('express');
const Usuario = require('../models/usuario.model');

exports.get_homepage = (request, response, next) => {
    console.log('Ruta homepage');
    console.log(request.body);

    // Declarar una constante error del tipo sesion
    const error = request.session.error || ''; 

    // Para que no este para siempre, el usuario puede equivocarse
    request.session.error = ''; 
    response.render('homepage', {
        username: request.session.username || '',

        // Variable que se le pasa al ejs para determinar su accion
        // registrar: false,
        error: error,
    })
}