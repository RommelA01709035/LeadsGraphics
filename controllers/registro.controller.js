const Usuario = require('../models/registro.model');
const bcrypt = require('bcryptjs');

exports.get_registro = (request, response, next) => {
    console.log('Ruta /registro');
    console.log(request.body);
    const error = request.session.error || '';
    const csrfToken = request.csrfToken();
    request.session.error = '';
    response.render('registro', {
        username: request.session.username || '',
        csrfToken: csrfToken,
        error: error,
    });
};

exports.post_registro = (request, response, next) => {
    console.log(request.body);
    console.log('Redirigir a homepage');
    const nombreUsuario = request.body.nombre_usuario; // Corrección: acceder a nombre_usuario en lugar de username
    const contrasena = request.body.contrasena;
    const confirmarContrasena = request.body.confirmar_contrasena;

    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        request.session.error = 'Las contraseñas no coinciden';
        response.redirect('/registro');
        return;
    }

    // Hash de la contraseña
    bcrypt.hash(contrasena, 10, (error, hashedPassword) => {
        if (error) {
            console.log('Error al hashear la contraseña:', error);
            response.status(500).send('Error interno del servidor');
            return;
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre_usuario: nombreUsuario,
            contrasena: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        nuevoUsuario.save((error) => {
            if (error) {
                console.log('Error al guardar el usuario en la base de datos:', error);
                response.status(500).send('Error interno del servidor');
                return;
            }
            
            // Redirigir a la página de inicio después del registro exitoso
            request.session.username = nombreUsuario;
            response.redirect('/homepage');
        });
    });
};
