const Grafica = require('../models/grafica.model');
const Leads = require('../models/leads.model');
const { end } = require('../util/database');

exports.get_crea_grafica = (request, response, next) => {
    const vista ='crea-grafica';
    const opcion = "";
    const startDate = new Date().toISOString().split('T')[0]; 
    const caso = ''
    console.log(request.session.email)
    console.log(request.session.idUsuario)
    response.render('crea-grafica', 
    { 
    opcion: opcion, 
    startDate: startDate,
    title: getTitleForCase(caso, '', ''), 
    vista: vista, 
    username: request.session.username || '',
    csrfToken: request.csrfToken(),});
};

exports.post_grafica = (request, response, next) => {
    const { caso, opcion, startDate, endDate } = request.body;
    const _startMonth = new Date(startDate);
    const _endMonth = new Date(endDate);
    const startMonth = new Date(_startMonth);
    const endMonth = new Date(_endMonth);
    let average
    let maximo 
    let minimo
    let registers


    _startMonth.setDate(_startMonth.getDate())
    console.log(_startMonth);
    _endMonth.setDate(_endMonth.getDate() + 1);
    console.log(_endMonth);


    console.log(caso);

    // Secuencia de promesas para obtener el mínimo, el máximo, el promedio y el recuento de tuplas
    Grafica.getAverage(startMonth, endMonth)
        .then(([rows2, fieldData]) => {
            average = rows2.map(row => ({
                promedio: row.promedio,
                mes: row.mes
            }));
            console.log("Promedio:");
            average.forEach(tupla => {
                console.log(tupla);
            });
            return Grafica.getMax(startMonth, endMonth);
        })
        .then(([rows3, fieldData]) => {
            maximo = rows3.map(row => ({
                maximo: row.maximo
            }));
            console.log("Maximo:");
            maximo.forEach(tupla => {
                console.log(tupla);
            });
            return Grafica.getMin(startMonth, endMonth);
        })
        .then(([rows4, fieldData]) => {
            minimo = rows4.map(row => ({
                minimo: row.minimo,
                mes: row.mes
            }));
            console.log("Minimo:");
            minimo.forEach(tupla => {
                console.log(tupla);
            });
            return Grafica.getCount(startMonth, endMonth);
        })
        .then(([rows5, fieldData]) => {
            registers = rows5.map(row => ({
                total_tuplas: row.total_tuplas
            }));
            console.log("registers:");
            registers.forEach(tupla => {
                console.log(tupla);
            });

            // Ejecutar el caso necesario para renderizar el tipo de gráfica correspondiente
            switch (caso) {
                case 'leadsPorMes':
                    Grafica.getLeadsMonth(startMonth, endMonth)
                        .then(([rows, fieldData]) => {
                            const data = rows.map(row => ({
                                mes: row.mes,
                                cantidad_leads: row.cantidad_leads,
                                estado_lead: row.estado_lead
                            }));
                            console.log("Tuplas obtenidas de la base de datos:");
                            data.forEach(tupla => {
                                console.log(tupla);
                            });
                            console.log("Username: " + request.session.username);
                            response.render('grafica', {
                                data: data, opcion: opcion,
                                caso: caso, startMonth: startMonth,
                                endMonth: endMonth,
                                titulo_grafica: "Leads por mes",
                                average: average,
                                maximo: maximo,
                                minimo: minimo,
                                title: getTitleForCase(caso, startMonth, endMonth),
                                registers: registers,
                                csrfToken: request.csrfToken(),
                                username: request.session.username || '',
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error creating chart" });
                        });
                    break;

                case 'LastMessage':
                    const { palabra } = request.body
                    console.log(palabra)
                    if (palabra) {
                        Grafica.getLastMessage(palabra, startMonth, endMonth)
                            .then(([rows, fieldData]) => {
                                const data = rows.map(row => ({
                                    cantidad_leads: row.cantidad_leads,
                                    cantidad_mensajes: row.cantidad_mensajes,
                                    palabra: palabra,
                                }));
                                console.log("Tuplas obtenidas de la base de datos:");
                                data.forEach(tupla => {
                                    console.log(tupla);
                                });
                                console.log(opcion);

                                response.render('grafica', {
                                    data: data,
                                    opcion: opcion,
                                    caso: caso,
                                    startMonth: startMonth,
                                    endMonth: endMonth,
                                    titulo_grafica: "Leads con esta palabra",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso, startMonth, endMonth),
                                    registers: registers,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                response.status(500).json({ message: "Error creating chart" });
                            });
                    } else {
                        console.log("Entraste al Else")
                        console.log(opcion);
                        response.render('crea-grafica', {
                            opcion: "LastMessage",
                            startMonth: startMonth,
                            endMonth: endMonth,
                            caso: caso,
                            titulo_grafica: "",
                            csrfToken: request.csrfToken(),
                            username: request.session.username || '',
                        });
                    }
                    break;

                case 'PerCompany':
                    Grafica.getPerCompany(startMonth, endMonth)
                        .then(([rows, fieldData]) => {
                            const data = rows.map(row => ({
                                cantidad_leads: row.cantidad_leads,
                                Compania: row.Compania,
                            }));
                            console.log("Tuplas obtenidas de la base de datos:");
                            data.forEach(tupla => {
                                console.log(tupla);
                            });
                            console.log(opcion);

                            response.render('grafica', {
                                data: data,
                                opcion: opcion,
                                caso: caso,
                                startMonth: startMonth,
                                endMonth: endMonth,
                                titulo_grafica: "Leads por compañia",
                                average: average,
                                maximo: maximo,
                                minimo: minimo,
                                title: getTitleForCase(caso, startMonth, endMonth),
                                registers: registers,
                                csrfToken: request.csrfToken(),
                                username: request.session.username || '',
                            });

                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error creating chart" });
                        });
                    break;

                default:
                    response.status(400).json({ message: "Invalid case" });
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({ message: "Error creating chart" });
        });
};


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getTitleForCase(caso, startMonth, endMonth) {
    switch (caso) {
        case 'leadsPorMes':
            return 'Leads por mes de los meses ' + formatDate(startMonth) + ' - ' + formatDate(endMonth);
        case 'LastMessage':
            return 'Leads con esta palabra ' + formatDate(startMonth) + ' - ' + formatDate(endMonth);
        case 'PerCompany':
            return 'Leads por compañía ' + formatDate(startMonth) + ' - ' + formatDate(endMonth);
        default:
            return 'LeadGraphs'; 
    }
}

