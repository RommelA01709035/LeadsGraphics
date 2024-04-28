
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
    const { nombre_usuario, IDUsuario } = request.params; // Captura el IDUsuario de los parámetros de la URL
    try {
        await Usuario.desactivar(IDUsuario);

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
    const { usuarioId } = req.params;

    try {
        await Usuario.reactivar(usuarioId);
        res.status(200).json({ message: 'Usuario reactivado exitosamente' });
    } catch (error) {
        console.error('Error al reactivar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al reactivar usuario' });
    }
};
