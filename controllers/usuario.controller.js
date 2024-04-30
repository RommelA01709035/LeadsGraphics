
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
        res.render('modificar-usuario', {
            usuario: usuario[0],
            username: req.session.username || '',
            csrfToken: req.csrfToken(),
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
        const updatedData = { nombre_usuario, Correo, Celular }; // Crear un objeto con los datos actualizados

        // Llamar al método de actualización del modelo con el ID de usuario y los datos actualizados
        await Usuario.actualizarUsuario(usuarioId, updatedData);

        res.redirect('/usuarios'); // Redirigir a la página de usuarios después de la actualización
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar usuario');
    }
};


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

