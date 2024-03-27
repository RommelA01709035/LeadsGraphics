const Usuario = require('../models/users.model');

exports.get_users_delete = (request, response, next) => {
    response.render('construir', {
        nombre: request.body.nombre || '',
        id: request.body.id || '',
    }); 
};

exports.post_users_delete = (request, response, next) => {
    console.log(request.body);
    const IDUsuario = request.body.id;
    const Habilitado = false;
    const nombre_usuario = request.body.nombre;
    Usuario.logical_delete_user(IDUsuario, Habilitado, nombre_usuario) // Llama al método para actualizar el usuario existente
        .then(() => {
            response.redirect('/construcciones');
        })
        .catch(error => {
            console.log(error);
            response.status(500).send("Error al actualizar la construcción");
        });
};