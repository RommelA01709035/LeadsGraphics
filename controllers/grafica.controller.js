const Grafica = require('../models/grafica.model');

exports.get_grafica = (request, response, next) => {
    Grafica.create()
        .then(([rows, fieldData]) => {
            const data = rows.map(row => ({
                mes: row.mes,
                cantidad_leads: row.cantidad_leads,
                estado_lead: row.estado_lead
            }));
            
            response.render('crea-grafica', { data: data });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error retrieving data for chart" });
        });
};

exports.get_crea_grafica = (request, response, next) => {
    response.render('crea-grafica');
};



exports.post_grafica = (request, response, next) => {
    const { x, opcion } = request.body;
    Grafica.getData(x)
        .then(([rows, fieldData]) => {
            const data = rows.map(row => ({
                estado_lead: row.x, 
                cantidad_leads: row.cantidad_leads,
            }));
            console.log("Tuplas obtenidas de la base de datos:");
            data.forEach(tupla => {
                console.log(tupla);
            });
            console.log(opcion);
            response.render('grafica', { data: data, opcion: opcion });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error creating chart" });
        });
};

