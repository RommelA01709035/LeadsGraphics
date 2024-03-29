const Grafica = require('../models/grafica.model');

exports.get_grafica = (request, response, next) => {
    Grafica.create()
        .then(([rows, fieldData]) => {
            const data = rows.map(row => ({
                mes: row.mes,
                cantidad_leads: row.cantidad_leads,
                estado_lead: row.estado_lead
            }));
            
            response.render('grafica', { data: data });
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error retrieving data for chart" });
        });
};

exports.get_crea_grafica = (request, response, next) => {
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



exports.post_grafica = (request, response, next) => {
    console.log(request.body);
    const grafica = 
    new Grafica(request.body.x, request.body.y);
    grafica.create()
        .then(([rows, fieldData]) => {
            response.setHeader('Set-Cookie', 
                'ultima_grafica=' + request.body.x + '; HttpOnly');
            response.redirect('/grafica');
        })
        .catch((error) => {console.log(error)});

};