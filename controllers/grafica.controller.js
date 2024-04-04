const Grafica = require('../models/grafica.model');
const Leads = require('../models/leads.model');
const { end } = require('../util/database');

exports.get_crea_grafica = (request, response, next) => {
    const opcion = "";
    const startDate = new Date().toISOString().split('T')[0]; // Fecha actual como valor predeterminado
    const minDate = "XXXX-XX-XX"; // Fecha mínima permitida
    const maxDate = "XXXX-XX-XX"; // Fecha máxima permitida
    response.render('crea-grafica', { opcion: opcion, startDate: startDate, minDate: minDate, maxDate: maxDate });
};


exports.post_grafica = (request, response, next) => {
    const { caso, opcion, startDate, endDate } = request.body;
    let titulo = ""
    const startMonth = new Date(startDate); 
    const endMonth = new Date(endDate); 
    console.log(caso)
    switch (caso) {
        case 'leadsPorMes':
            Grafica.getLeadsMonth(startMonth, endMonth)
                .then(([rows, fieldData]) => {
                    const data = rows.map(row => ({
                        mes: row.mes, 
                        cantidad_leads: row.cantidad_leads,
                    }));
                    console.log("Tuplas obtenidas de la base de datos:");
                    data.forEach(tupla => {
                        console.log(tupla);
                    });
                    console.log(opcion);
                    console.log(caso)
                    response.render('grafica', { data: data, opcion: opcion , caso: caso, startMonth: startMonth, endMonth: endMonth, titulo: "Leads por mes"});
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Error creating chart" });
                });
            break;
        case 'leadsPorMesCategory':
            Grafica.getLeadsMonthCategory(startMonth, endMonth)
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
                    response.render('grafica', { data: data, opcion: opcion, caso: caso, titulo: "Leads por categoria"});
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Error creating chart" });
                });
            break;
        case 'LastMessage':
            const {palabra} = request.body
            console.log(palabra)
            if(palabra){
                Grafica.getLastMessage(palabra,startMonth, endMonth)
                .then(([rows, fieldData]) => {
                    const data = rows.map(row => ({
                        cantidad_mensajes: row.cantidad_mensajes, 
                        palabra: palabra,
                    }));
                    console.log("Tuplas obtenidas de la base de datos:");
                    data.forEach(tupla => {
                        console.log(tupla);
                    });
                    console.log(opcion);
                    response.render('grafica', { data: data, opcion: opcion, caso: caso, titulo: "Leads con este mensaje" });
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Error creating chart" });
                });}
                else {
                    console.log("ENtraste al Else")
                    console.log(opcion);
                    response.render('crea-grafica', { opcion: "LastMessage", startMonth: startMonth, endMonth: endMonth, caso: caso, titulo: ""});
                }
            
            break;   
            case 'PerCompany':

                    Grafica.getPerCompany(startMonth, endMonth)
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            cantidad_mensajes: row.cantidad_mensajes, 
                            Compania: row.Compania,
                        }));
                        console.log("Tuplas obtenidas de la base de datos:");
                        data.forEach(tupla => {
                            console.log(tupla);
                        });
                        console.log(opcion);
                        response.render('grafica', { data: data, opcion: opcion, caso: caso, titulo: "Leads por compañia" });
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