const Usuario = require('../models/usuario.model');

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
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
