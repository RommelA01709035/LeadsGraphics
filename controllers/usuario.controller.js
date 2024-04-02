const Usuario = require('../models/usuario.model');

exports.getUsuarioPage = async (req, res) => {

    try {

        const [usuario,fieldData]= await Usuario.fetchAll();

        console.log(usuario)
        res.render('consultar_usuario', {usuario: usuario});

        const instanciaUsuario = new Usuario("nombre", "correo", "telefono", "id");
        console.log("Instancia del modelo creada:", instanciaUsuario);


    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
};