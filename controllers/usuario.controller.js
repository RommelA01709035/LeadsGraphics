const Usuario = require('../models/usuario.model');

exports.getUsuarioPage = async (req, res) => {

    try {

        const [usuario,fieldData]= await Usuario.fetchAll();

        console.log(usuario)
        const opcion = "";
        const startMonth = 1; 
        const endMonth = 12; 
        res.render('consultar_usuario', { usuario: usuario, opcion: opcion, startMonth: startMonth, endMonth: endMonth });
        
        const instanciaUsuario = new Usuario("nombre", "correo", "telefono", "id");
        console.log("Instancia del modelo creada:", instanciaUsuario);


    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
};

exports.get_modify_Usuario = (request, response, next) => {
    const opcion = "";
    const startMonth = 1; 
    const endMonth = 12; 
    response.render('modify-usuario', { opcion: opcion, startMonth: startMonth, endMonth: endMonth });
};
