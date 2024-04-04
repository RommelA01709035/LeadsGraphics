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

exports.get_login = (request, response, next) => {
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
    request.session.username = request.body.username; // Gracias al modulo session, ahora tenemos session para crear un nuevo objeto tipo session
    response.redirect('/homepage');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};