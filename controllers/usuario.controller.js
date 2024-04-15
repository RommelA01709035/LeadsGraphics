const Usuario = require('../models/usuario.model');

exports.getUsuarioPage = async (req, res) => {
    try {
        const [usuario, fieldData] = await Usuario.fetchAll();
        console.log(usuario);

        res.render('consultar_usuario', { usuario: usuario, message: false});
        
        const instanciaUsuario = new Usuario("nombre", "correo", "telefono", "id");
        console.log("Instancia del modelo creada:", instanciaUsuario);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
};



exports.post_delete_Usuario = (request, response, next) => {
    console.log("Hiciste post delete");
    const { nombre, id } = request.body;
    console.log(nombre);
    console.log(id);

    Usuario.delete_logical_user(nombre, id)
    .then(([rows, fieldData]) => {
        const data = rows.map(row => ({
            nombre: row.nombre_usuario, 
            Correo: row.Correo,
            Celular: row.Celular,
            IDUsuario: row.IDUsuario,
            Habilitado: row.Habilitado
        }));

        const usuarioEliminado = {
            nombre: nombre,
            IDUsuario: id
        };

        const message = `El usuario ${usuarioEliminado.nombre} con ID ${usuarioEliminado.IDUsuario} ha sido eliminado correctamente.`;

        console.log("Tuplas obtenidas de la base de datos:");
        data.forEach(tupla => {
            console.log(tupla);
        });

        Usuario.fetchAll().then(([rows, fieldData]) => {
            const usuario = rows.map(row => ({
                nombre_usuario: row.nombre_usuario, 
                Correo: row.Correo,
                Celular: row.Celular,
                IDUsuario: row.IDUsuario,
                Habilitado: row.Habilitado
            }));
            console.log("Tuplas obtenidas de la base de datos:");
            data.forEach(tupla => {
                console.log(tupla);
            });
            response.render('consultar_usuario', { data: data, usuario: usuario, message: message });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error no se encontraron usuarios" });
        });

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
        const data = rows.map(row => ({
            nombre: row.nombre_usuario, 
            Correo: row.Correo,
            Celular: row.Celular,
            IDUsuario: row.IDUsuario,
            Habilitado: row.Habilitado
        }));

        const usuarioReactivado = {
            nombre: nombre,
            IDUsuario: id
        };

        const message = `El usuario ${usuarioReactivado.nombre} con ID ${usuarioReactivado.IDUsuario} ha sido reactivado correctamente.`;

        console.log("Tuplas obtenidas de la base de datos:");
        data.forEach(tupla => {
            console.log(tupla);
        });

        Usuario.fetchAll()
        .then(([rows, fieldData]) => {
            const usuario = rows.map(row => ({
                nombre_usuario: row.nombre_usuario, 
                Correo: row.Correo,
                Celular: row.Celular,
                IDUsuario: row.IDUsuario,
                Habilitado: row.Habilitado
            }));
            console.log("Tuplas obtenidas de la base de datos:");
            data.forEach(tupla => {
                console.log(tupla);
            });
            response.render('consultar_usuario', { data: data, usuario: usuario, message: message });
        }).catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error no se encontraron usuarios" });
        });

    })
    .catch(error => {
        console.log(error);
        response.status(500).json({ message: "Error al deshabilitar" });
    });
};




