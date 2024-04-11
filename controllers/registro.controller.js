const Usuario = require('../models/registro.model');

exports.get_registro = (request, response, next) => {
    console.log('Ruta /registro');
    console.log(request.body);
    const error = request.session.error || ''; // Declarar una constante error del tipo sesion
    const csrfToken = request.csrfToken();
    request.session.error = ''; // Para que no este para siempre, el usuario puede equivocarse
    response.render('registro', { // Render de la plantilla login
        username: request.session.username || '',
        //registrar: false, // Variable que se le pasa al ejs para determinar su accion
        error: error,
    });
};

exports.post_registro = (request, response, next) => {
    console.log(request.body);
    console.log('Redirigir a homepage');
    request.session.username = request.body.username;
    response.redirect('/homepage');
};