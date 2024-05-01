const Usuario = require('../models/usuario.model');
const loginController = require('../controllers/login.controller');
const Historial = require('../models/historial.model');


exports.getUsuarioPage = async (request, response, next) => {
    try {
        const [usuario, fieldData] = await Usuario.fetchAll();
        console.log(usuario);

        response.render('consultar_usuario', { 
            usuario: usuario,
            message: false, 
            username: request.session.username || '',
            roles: request.session.roles || [],
            csrfToken: request.csrfToken()
        });
        
        const instanciaUsuario = new Usuario("nombre", "correo", "telefono", "id");
        console.log("Instancia del modelo creada:", instanciaUsuario);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        response.status(500).send('Error al obtener usuarios');
    }
};



exports.post_delete_Usuario = (request, response, next) => { 
    console.log("Hiciste post delete");
    const { nombre, id } = request.body;
    console.log(nombre);
    console.log(id);

    Usuario.delete_logical_user(nombre, id)
    .then(([rows, fieldData]) => {
        const id_usuario = request.session.idUsuario;
        console.log(id_usuario);

        return Historial.insertRegistroHistorial(id_usuario, "Elimino a un Usuario")
    })
    .then(() => {
        console.log("Se agregó el registro al historial");
        return Usuario.fetchAll().then(([rows, fieldData]) => {
            const usuarios = rows.map(row => ({
                nombre_usuario: row.nombre_usuario, 
                Correo: row.Correo,
                Celular: row.Celular,
                IDUsuario: row.IDUsuario,
                Habilitado: row.Habilitado
            }));
            const message = `El usuario ${nombre} con ID ${id} ha sido eliminado correctamente.`;
            response.render('consultar_usuario', { 
                usuario: usuarios,
                message: message,
                csrfToken: request.csrfToken(),
                username: request.session.username || '',
                roles: request.session.roles || [],
            });
        })
    })
    
    .catch(error => {
        console.log(error);
        response.status(500).json({ message: "Error al deshabilitar" });
    });
};

exports.post_reactivate_Usuario = (request, response, next) => {
    console.log("Hiciste post reactive");
    const { nombre, id } = request.body;
    console.log(nombre);
    console.log(id);

    Usuario.reactivate_user(nombre, id)
    .then(([rows, fieldData]) => {
        const id_usuario = request.session.idUsuario;
        console.log(id_usuario);

        return Historial.insertRegistroHistorial(id_usuario, "Reactivo Usuario")
    })
    .then(([rows, fieldData]) => {

        // Obtener los usuarios actualizados después de reactivar
        return Usuario.fetchAll(); 
    })
    .then(([rows, fieldData]) => {
        
        // Renderizar la vista con los usuarios actualizados y el mensaje
        const usuarios = rows.map(row => ({
            nombre_usuario: row.nombre_usuario, 
            Correo: row.Correo,
            Celular: row.Celular,
            IDUsuario: row.IDUsuario,
            Habilitado: row.Habilitado
        }));
        const message = `El usuario ${nombre} con ID ${id} ha sido reactivado correctamente.`;
        
        response.render('consultar_usuario', { 
            usuario: usuarios,
            message: message,
            csrfToken: request.csrfToken(),
            username: request.session.username || '',
            roles: request.session.roles || [],
        });
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ message: "Error al reactivar" });
    });
};

// Usuarios (Seller/Admin)
exports.get_signup_usuario = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    const message = request.session.message || '';
    const errorMessage = request.session.errorMessage || '';
    response.render('registrar_usuario', {
        message: message,
        errorMessage: errorMessage,
        username: request.session.username || '',
        registrar: true,
        error: error,
        csrfToken: request.csrfToken(),
        roles: request.session.roles || [],
    }); 
};


exports.post_signup_usuario = (request, response, next) => {
    const { nombre_usuario, correo, celular, contrasena, rol} = request.body;
    const nuevo_usuario = Usuario.createUserContructor(nombre_usuario, correo, celular, contrasena, rol);
    console.log(request.body);

    
    // Mapa de correspondencia entre roles y IDs en la base de datos
    const rolesMap = {
        'owner': 1,
        'admin': 2,
        'seller': 3
    }

    const rolID = rolesMap[rol];

    if (!rolID) {
        const errorMessage = 'Rol inválido.';
        console.log(errorMessage);
        request.session.error = errorMessage;
        return response.redirect('/usuarios');
    }

    Usuario.createUser(nombre_usuario, correo, celular, contrasena, rolID)
        .then(([rows, fieldData]) => {

            console.log(rows);
            // Obtener el ID del usuario recién registrado
            const userId = rows;
            console.log(userId)
            return userId;
        })
        .then((userId) => {
            // Obtener los detalles del usuario utilizando su ID
            return Usuario.fetchOne(userId);
        })
        .then(([user, fieldData]) => {
            const message = `El usuario ${user[0].nombre_usuario} con correo electrónico ${user[0].Correo} ha sido registrado correctamente.`;
            request.session.message = message; 
            console.log("Usuario registrado correctamente");
            response.redirect('/usuarios');
        })
        .catch(error => {
            console.log(error);
            request.session.error = 'Error al registrar usuario.';
            response.redirect('/usuarios');
        });
};