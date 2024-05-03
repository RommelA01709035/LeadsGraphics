const { title } = require('process');
const Grafica = require('../models/grafica.model');
const Leads = require('../models/leads.model');
const { end } = require('../util/database');
const Historial = require('../models/historial.model');
const { error } = require('console');
const dayjs = require('dayjs')

//import dayjs from 'dayjs' // ES 2015
dayjs().format()

exports.get_crea_grafica = (request, response, next) => {
    
    const opcion = "";
    const startDate = new Date().toISOString().split('T')[0]; 
    const caso = '';
    const title = '';
    console.log(request.session.email)
    console.log(request.session.idUsuario)
    response.render('crea-grafica', 
    { 
    opcion: opcion,
    caso: caso, 
    startDate: startDate,
    embudos: '',
    estados: '',
    etapas: '',
    title: title,
    username: request.session.username || '',
    roles: request.session.roles || [],
    csrfToken: request.csrfToken(),});
};

exports.post_grafica = (request, response, next) => {
    const { caso, opcion, startDate, endDate } = request.body;
    const _startMonth = new Date(startDate);
    const _endMonth = new Date(endDate);
    const startMonth = new Date(_startMonth);
    const endMonth = new Date(_endMonth);
    const username = request.session.username;
    let average;
    let maximo;
    let minimo;
    let registers;
    let embudos;
    let estados;
    let etapas;

    
    startMonth.setDate(_startMonth.getDate())
    console.log(startMonth);
    endMonth.setDate(_endMonth.getDate());
    console.log(endMonth);
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
                                data: data,
                                    opcion: opcion,
                                    caso: caso,
                                    startMonth: formatDate(startMonth),
                                    endMonth: formatDate(endMonth),
                                    titulo_grafica: "Leads por mes",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso),
                                    registers: registers,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                    roles: request.session.roles || [],
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error creating chart" });
                        });
                    break;
                case 'Historial':
                    Historial.accionesContadas()
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            accion: row.accion,
                            cantidad: row.cantidad,
                        }));
                        console.log("Tuplas obtenidas de la base de datos:");
                        data.forEach(tupla => {
                            console.log(tupla);
                        });

			response.render('grafica', {
                                data: data,
                                    opcion: opcion,
                                    caso: caso,
                                    startMonth: formatDate(startMonth),
                                    endMonth: formatDate(endMonth),
                                    titulo_grafica: "Historial de acciones de la app",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso),
                                    registers: registers,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                    roles: request.session.roles || [],
                            });                    }).catch(error =>{
                        console.log(error);
                        response.status(500).json({ message: "Error creating chart Historial" });
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
                                    startMonth: formatDate(startMonth),
                                    endMonth: formatDate(endMonth),
                                    titulo_grafica: "Leads con esta palabra",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso),
                                    registers: registers,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                    roles: request.session.roles || [],
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
                            startMonth: formatDate(startMonth),
                            endMonth: formatDate(endMonth),
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
                                    startMonth: formatDate(startMonth),
                                    endMonth: formatDate(endMonth),
                                    titulo_grafica: "Leads por compañias",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso),
                                    registers: registers,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                    roles: request.session.roles || [],
                            });

                        })
                        .catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error creating chart" });
                        });
                    break;
                    case 'LeadsSeller':
                        Grafica.getDropdownEmbudo(startMonth, endMonth)
                            .then(([rows7, fieldData]) => {
                                embudos = rows7.map(row => ({
                                    embudos: row.Embudo
                                }));
                                console.log("Tuplas obtenidas de la base de datos de embudos:");
                                embudos.forEach(tupla => {
                                    console.log(tupla);
                                });
                                return Grafica.getDropdownEstado(startMonth, endMonth);
                            })
                            .then(([rows6, fieldData]) => {
                                estados = rows6.map(row => ({
                                    estados: row.estado_lead
                                }));
                                console.log("Tuplas obtenidas de la base de datos de estados:");
                                estados.forEach(tupla => {
                                    console.log(tupla);
                                });
                                return Grafica.getDropdownEtapa(startMonth, endMonth);
                            })
                            .then(([rows8, fieldData]) => {
                                etapas = rows8.map(row => ({
                                    etapas: row.etapa
                                }));
                                console.log("Tuplas obtenidas de la base de datos de etapas:");
                                etapas.forEach(tupla => {
                                    console.log(tupla);
                                });
                    
                                // Después de obtener todos los valores necesarios, obtener los datos de leads por vendedor
                                return Grafica.getLeadsPerSeller(startMonth, endMonth);
                            })
                            .then(([rows, fieldData]) => {
                                const data = rows.map(row => ({
                                    cantidad_leads: row.cantidad_leads,
                                    archivado: row.archivado,
                                    Seller: row.Seller_asignado,
                                }));
                                console.log("Tuplas obtenidas de la base de datos de leads por vendedor:");
                                data.forEach(tupla => {
                                    console.log(tupla);
                                });
                                // Renderizar la vista aquí dentro, después de obtener todos los valores necesarios
                             response.render('grafica', {
                                    data: data,
                                    opcion: opcion,
                                    caso: caso,
                                    startMonth: formatDate(startMonth),
                                    endMonth: formatDate(endMonth),
                                    titulo_grafica: "Leads por cada seller",
                                    average: average,
                                    maximo: maximo,
                                    minimo: minimo,
                                    title: getTitleForCase(caso),
                                    registers: registers,
                                    embudos: embudos,
                                    estados: estados,
                                    etapas: etapas,
                                    csrfToken: request.csrfToken(),
                                    username: request.session.username || '',
                                    roles: request.session.roles || [],
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                response.status(500).json({ message: "Error obteniendo la gráfica" });
                            });
                        break;
                    
            case 'Archivados':
                console.log(startDate);
                console.log(endDate);
                Grafica.getLeadsArchivados(startMonth, endMonth)
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            cantidad_leads: row.cantidad_leads,
                            archivado: row.archivado,
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
                            startMonth: formatDate(startMonth),
                            endMonth: formatDate(endMonth),
                            titulo_grafica: "Leads archivados",
                            average: average,
                            maximo: maximo,
                            minimo: minimo,
                            title: getTitleForCase(caso),
                            registers: registers,
                            csrfToken: request.csrfToken(),
                            username: request.session.username || '',
                            roles: request.session.roles || [],
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

exports.post_grafica_usuario = (request, response, next) => {
    const { caso, opcion, startDate, endDate, consulta, valor } = request.body;
    console.log(startDate)

    // Transforma la cadena de fecha en el formato adecuado (ISO 8601)
    const formattedStartDate = startDate.split('/').reverse().join('-');
    const formattedEndDate = endDate.split('/').reverse().join('-');

    console.log(formattedStartDate); 
    console.log(formattedEndDate); 

    // Crear objetos Date con las fechas formateadas
    const startMonth = new Date(formattedStartDate);
    const endMonth = new Date(formattedEndDate);
    let average;
    let maximo;
    let minimo;
    let registers;
    let embudos;
    let estados;
    let etapas;
    console.log(startMonth);
    console.log(endMonth)
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

            return Grafica.getDropdownEmbudo(startMonth, endMonth);
        })
        .then(([rows7, fieldData]) => {
            embudos = rows7.map(row => ({
                embudos: row.Embudo
            }));
            console.log("Tuplas obtenidas de la base de datos de embudos:");
            embudos.forEach(tupla => {
                console.log(tupla);
            });
            return Grafica.getDropdownEstado(startMonth, endMonth);
        })
        .then(([rows6, fieldData]) => {
            estados = rows6.map(row => ({
                estados: row.estado_lead
            }));
            console.log("Tuplas obtenidas de la base de datos de estados:");
            estados.forEach(tupla => {
                console.log(tupla);
            });
            return Grafica.getDropdownEtapa(startMonth, endMonth);
        })
        .then(([rows8, fieldData]) => {
            etapas = rows8.map(row => ({
                etapas: row.etapa
            }));
            console.log("Tuplas obtenidas de la base de datos de etapas:");
            etapas.forEach(tupla => {
                console.log(tupla);
            });

            switch(consulta){
                case 'embudo':
                    Grafica.getDropdownEmbudoValue(valor, startMonth, endMonth)
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            cantidad_leads: row.cantidad_leads,
                            Seller_asignado: row.Seller_asignado,
                            _embudo: row.embudo 
                        }));
                        console.log("Tuplas obtenidas de la base de datos de leads por vendedor:");
                        data.forEach(tupla => {
                            console.log(tupla);
                        });
                        
                        console.log(consulta)
                        // Renderizar la vista aquí dentro, después de obtener todos los valores necesarios
                        response.render('grafica', {
                            data: data,
                            opcion: opcion,
                            caso: 'caso',
                            startMonth: formatDate(startMonth),
                            endMonth: formatDate(endMonth),
                            titulo_grafica: "Leads por cada seller en el embudo " + valor,

                            consulta: consulta,
                            average: average,
                            maximo: maximo,
                            minimo: minimo,
                            title: getTitleForCase(caso),
                            registers: registers,
                            embudos: embudos,
                            estados: estados,
                            etapas: etapas,
                            csrfToken: request.csrfToken(),
                            username: request.session.username || '',
                            roles: request.session.roles || [],
                        });
                        
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error obteniendo la gráfica" });
                    });
                break ;
                case 'etapa':
                    Grafica.getDropdownEtapaValue(valor, startMonth, endMonth)
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            cantidad_leads: row.cantidad_leads,
                            Seller_asignado: row.Seller_asignado,
                            _etapa: row.etapa
                        }));
                        console.log("Tuplas obtenidas de la base de datos de leads por vendedor:");
                        data.forEach(tupla => {
                            console.log(tupla);
                        });
                        
                        console.log(consulta)
                        // Renderizar la vista aquí dentro, después de obtener todos los valores necesarios
                        response.render('grafica', {
                            data: data,
                            opcion: opcion,
                            caso: 'caso',
                            startMonth: formatDate(startMonth),
                            endMonth: formatDate(endMonth),
                            titulo_grafica: "Leads por cada seller en el embudo " + valor,

                            consulta: consulta,
                            average: average,
                            maximo: maximo,
                            minimo: minimo,
                            title: getTitleForCase(caso),
                            registers: registers,
                            embudos: embudos,
                            estados: estados,
                            etapas: etapas,
                            csrfToken: request.csrfToken(),
                            username: request.session.username || '',
                            roles: request.session.roles || [],
                        });
                        
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error obteniendo la gráfica" });
                    });
                break ;
                case 'estado':
                    Grafica.getDropdownEstadoValue(valor, startMonth, endMonth)
                    .then(([rows, fieldData]) => {
                        const data = rows.map(row => ({
                            cantidad_leads: row.cantidad_leads,
                            Seller_asignado: row.Seller_asignado,
                            estado_lead: row.estado_lead
                        }));
                        console.log("Tuplas obtenidas de la base de datos de leads por vendedor:");
                        data.forEach(tupla => {
                            console.log(tupla);
                        });
                        
                        console.log(consulta)
                        // Renderizar la vista aquí dentro, después de obtener todos los valores necesarios
                        response.render('grafica', {
                            data: data,
                            opcion: opcion,
                            caso: 'caso',
                            startMonth: formatDate(startMonth),
                            endMonth: formatDate(endMonth),
                            titulo_grafica: "Leads por cada seller en el embudo " + valor,

                            consulta: consulta,
                            average: average,
                            maximo: maximo,
                            minimo: minimo,
                            title: getTitleForCase(caso),
                            registers: registers,
                            embudos: embudos,
                            estados: estados,
                            etapas: etapas,
                            csrfToken: request.csrfToken(),
                            username: request.session.username || '',
                            roles: request.session.roles || [],
                        });
                        
                    })
                    .catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error obteniendo la gráfica" });
                    });
                break ;
            }
        })
};

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function getTitleForCase(caso) {
    switch (caso) {
        case 'leadsPorMes':
            return 'Leads por mes ' ;
        case 'LastMessage':
            return 'Leads con esta palabra ' ;
        case 'PerCompany':
            return 'Leads por compañía ' ;
        case 'Historial':
            return 'Histórico de acciones por usuarios ';
        case 'Archivados':
            return 'Leads archivados';
        case 'LeadsSeller':
            return 'Leads que tiene cada seller';
        default:
            return 'LeadGraphs'; 
    }
}
