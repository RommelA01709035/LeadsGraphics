const Grafica = require('../models/grafica.model');


exports.get_crea_grafica = (request, response, next) => {
    response.render('crea-grafica');
};



exports.post_grafica = (request, response, next) => {
    const { caso, opcion } = request.body;
    
    switch (caso) {
        case 'leadsPorMes':
            Grafica.getLeadsMonth()
                .then(([rows, fieldData]) => {
                    const data = rows.map(row => ({
                        estado_lead: row.mes, 
                        cantidad_leads: row.cantidad_leads,
                    }));
                    console.log("Tuplas obtenidas de la base de datos:");
                    data.forEach(tupla => {
                        console.log(tupla);
                    });
                    console.log(opcion);
                    console.log(caso)
                    response.render('grafica', { data: data, opcion: opcion , caso: caso});
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Error creating chart" });
                });
            break;
        case 'leadsPorMesCategory':
            Grafica.getLeadsMonthCategory()
                .then(([rows, fieldData]) => {
                    const data = rows.map(row => ({
                        mes: row.mes,
                        estado_lead: row.estado_lead, 
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
            break;
        case 'leadsPorMes':
            Grafica.getLeadsMonth()
                .then(([rows, fieldData]) => {
                    const data = rows.map(row => ({
                        estado_lead: row.mes, 
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
            break;                                          

        default:
            response.status(400).json({ message: "Invalid case" });
    }
};

