const Historial = require('../models/historial.model');

exports.get_historial = async (request, response, next) => {
    try {
        const [historial, fieldData] = await Historial.fetchHistorialUsernames();
        console.log(historial);
        const error = request.session.error || '';

        response.render('historial', {
            username: request.session.username || '',
            roles: request.session.roles || [],
            error: error,
            historial: historial,
        });
    } catch (error) {
        console.error('Error al obtener historial:', error);
        response.status(500).send('Error al obtener historial');
    }
}