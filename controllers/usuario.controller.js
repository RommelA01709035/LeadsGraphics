
const Usuario = require('../models/usuario.model');
const loginController = require('../controllers/login.controller');
const Historial = require('../models/historial.model');


exports.getUsuarioPage = async (request, response, next) => {
    try {
        const [usuarios, fieldData] = await Usuario.fetchAll();
        console.log(usuarios);

        response.render('consultar_usuario', { 
            usuarios: usuarios,
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


exports.modificarUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.IDUsuario;
        console.log('ID de usuario a modificar:', usuarioId); // Agregar este console.log
        const usuario = await Usuario.fetchOne(usuarioId);
        console.log('Datos del usuario a modificar:', usuario); // Agregar este console.log
        Usuario.getRolOption()
        .then(([rows, fieldData]) =>{
            roles_ = rows.map(row => ({
                IDRol_: row.IDRol,
                descripcion_rol: row.Descripcion_Rol
            }));
            roles_.forEach(tupla => {
                console.log(tupla);
            });

            
        // Renderiza la vista de modificar lead
        res.render('modificar-usuario', {
            usuario: usuario[0],
            username: req.session.username || '',
            rolesOption: roles_,
            roles: req.session.roles || [],
            csrfToken: req.csrfToken(),
        });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error obteniendo sellers" });
        });
        
    } catch (error) {
        console.error('Error al obtener usuario para modificar:', error);
        res.status(500).send('Error al obtener usuario para modificar');
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.IDUsuario;
        const { nombre_usuario, Correo, Celular } = req.body; // Obtener los datos del formulario
        const updatedData = { nombre_usuario, Correo, Celular,  }; // Crear un objeto con los datos actualizados
        const rolNuevo = req.body.rol;

        console.log(rolNuevo)
        console.log(usuarioId)
        // Llamar al método de actualización del modelo con el ID de usuario y los datos actualizados
        await Usuario.actualizarUsuario(usuarioId, updatedData);
        await Usuario.actualizarRol(rolNuevo, usuarioId);

        res.redirect('/usuarios'); // Redirigir a la página de usuarios después de la actualización
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar usuario');
    }
}

exports.buscarUsuario = async (request, response, next) => {
    try {
        const nombre = request.params.nombre || '';
        const usuarios = await Usuario.buscarPorNombreDeUsuario(nombre);

        
        // Agrega este log para imprimir los datos encontrados
        console.log('Datos de usuarios encontrados:', usuarios);

        response.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        response.status(500).json({ error: 'Ocurrió un error al buscar usuarios' });
    }
};

exports.desactivarUsuario = async (request, response) => {
    const { IDUsuario } = request.params; // Obtener IDUsuario de los parámetros de la URL
    const { nombreUsuario } = request.body; // Obtener nombreUsuario del cuerpo de la solicitud

    try {
        await Usuario.desactivar(nombreUsuario, IDUsuario); // Llamar a la función desactivar del modelo con nombreUsuario y IDUsuario

        // Obtener los usuarios actualizados después de la desactivación
        const [usuarios, fieldData] = await Usuario.fetchAll(); 

        response.status(200).json({ 
            message: 'Usuario desactivado exitosamente',
            usuarios: usuarios    
        });
    } catch (error) {
        console.error('Error al desactivar usuario:', error);
        response.status(500).json({ error: 'Ocurrió un error al desactivar usuario' });
    }
};

exports.reactivarUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    const { nombreUsuario } = req.body; // Obtener nombreUsuario del cuerpo de la solicitud
    console.log(usuarioId, nombreUsuario )

    try {
        await Usuario.reactivar(nombreUsuario, usuarioId);

        // Obtener los usuarios actualizados después de la desactivación
        const [usuarios, fieldData] = await Usuario.fetchAll(); 

        res.status(200).json({ 
            message: 'Usuario reactivado exitosamente',
            usuarios: usuarios    
        });
    } catch (error) {
        console.error('Error al reactivar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al reactivar usuario' });
    }
};

// Usuarios (Seller/Admin)
exports.get_signup_usuario = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    const message = request.session.message || '';
    const errorMessage = request.session.errorMessage || '';
    response.render('registrar_usuarios', {
        message: message,
        errorMessage: errorMessage,
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
        return response.redirect('/usuarios/signupusuario');
    }

    Usuario.createUser(nombre_usuario, correo, celular, contrasena, rolID)
        .then(([row, fieldData]) => {
            console.log(row[0]['id']);

            const userId = row[0]['id'];
            console.log(userId)
            return userId;
        })
        .then((userId) => {
            // Obtener los detalles del usuario utilizando su ID
            return Usuario.fetchOne(userId);
        })
        .then(([user, fieldData]) => {
            console.log(user);
            const message = `El usuario ${user[0].nombre_usuario} con correo electrónico ${user[0].Correo} ha sido registrado correctamente.`;
            request.session.message = message; 
            console.log("Usuario registrado correctamente");
            response.redirect('/usuarios/signupusuario');
        })
        .catch(error => {
            console.log(error);
            request.session.error = 'Error al registrar usuario.';
            response.redirect('/usuarios/signupusuario');
        });
};