const Usuario = require('../models/inicio.model');

exports.get_login = (request, response, next) => {
    response.render('login');
};

exports.post_login = (request, response, next) => {
    const { usuario, contrasena } = request.body;

    if (usuario && contrasena) {
        Usuario.findOne({ usuario: usuario, contrasena: contrasena })
            .then(usuarioEncontrado => {
                if (usuarioEncontrado) {
            // La base de datos vallida al usuario
                    response.redirect('/dashboard');
                } else {
            // La base de datos NO vallida al usuario
                    response.render('login', { error: 'Credenciales incorrectas' });
                }
            })
            .catch(error => {
                // Manejo de error
                response.render('login', { error: 'Error en la base de datos' });
            });
    } else {
        // El usuario no llena los campos
        response.render('login', { error: 'Por favor, completa todos los campos' });
    }
};

// Dashboard es la página a la que te dirige una vez inicias sesión
exports.get_dashboard = (request, response, next) => {
    response.render('dashboard');
};

