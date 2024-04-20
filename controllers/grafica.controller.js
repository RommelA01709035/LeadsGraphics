const Grafica = require('../models/grafica.model');
const Leads = require('../models/leads.model');
const { end } = require('../util/database');
// Importar los módulos necesarios
const PDFDocument = require('pdfkit');
const fs = require('fs');


exports.get_crea_grafica = (request, response, next) => {
    const vista ='crea-grafica';
    const opcion = "";
    const startDate = new Date().toISOString().split('T')[0]; 
    const minDate = "XXXX-XX-XX"; 
    const maxDate = "XXXX-XX-XX"; 
    response.render('crea-grafica', 
    { opcion: opcion, 
    startDate: startDate, 
    minDate: minDate, 
    maxDate: maxDate, 
    vista: vista, 
    username: request.session.username || '',
    csrfToken: request.csrfToken(),});
};


exports.post_grafica = (request, response, next) => {
    const { caso, opcion, startDate, endDate } = request.body;
    
    const _startMonth = new Date(startDate); 
    const _endMonth = new Date(endDate); 

    _startMonth.setDate(_startMonth.getDate() )
    console.log(_startMonth);
    _endMonth.setDate(_endMonth.getDate() + 1);
    console.log(_endMonth);

    const startMonth = new Date(_startMonth); 
    const endMonth = new Date(_endMonth); 
    console.log(caso)
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
                    Grafica.getAverage(startMonth,endMonth)
                    .then(([rows2, fieldData]) => {
                        const average = rows2.map(row => ({
                            promedio: row.promedio,
                            mes: row.mes
                        }));
                        console.log("Promedio:");
                        average.forEach(tupla => {
                            console.log(tupla);
                        });
                        Grafica.getMax(startMonth, endMonth)
                        .then(([rows3, fieldData]) => {
                            const maximo = rows3.map(row => ({
                                maximo: row.maximo
                            }));
                            console.log("Maximo:");
                            maximo.forEach(tupla => {
                                console.log(tupla);
                            });
                        
                            Grafica.getMin(startMonth, endMonth)
                            .then(([rows4, fieldData]) => {
                                const minimo = rows4.map(row => ({
                                    minimo: row.minimo,
                                    mes: row.mes
                                }));
                                console.log("Minimo:");
                                minimo.forEach(tupla => {
                                    console.log(tupla);
                                });
                                
                                
                                Grafica.getCount(startMonth, endMonth)
                                .then(([rows5, fieldData]) => {
                                    const registers = rows5.map(row => ({
                                        total_tuplas: row.total_tuplas
                                    }));
                                    console.log("registers:");
                                    registers.forEach(tupla => {
                                        console.log(tupla);
                                    });
                                    response.render('grafica', { 
                                        data: data, opcion: opcion , 
                                        caso: caso, startMonth: startMonth, 
                                        endMonth: endMonth,
                                        titulo: "Leads por mes", 
                                        average:average, 
                                        maximo: maximo, 
                                        minimo: minimo, 
                                        registers: registers, 
                                        csrfToken: request.csrfToken(),
                                        username: request.session.username || '',
                                    });
                                }).catch(error => {
                                    console.log(error);
                                    response.status(500).json({ message: "Error en minimo" });
                                });
                            }).catch(error => {
                                console.log(error);
                                response.status(500).json({ message: "Error en minimo" });
                            });
                        }).catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error en maximo" });
                        });
                        
                    }).catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error en promedio" });
                    });
                    
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
                        cantidad_leads: row.cantidad_leads,
                        cantidad_mensajes: row.cantidad_mensajes, 
                        palabra: palabra,
                    }));
                    console.log("Tuplas obtenidas de la base de datos:");
                    data.forEach(tupla => {
                        console.log(tupla);
                    });
                    console.log(opcion);
                   
                    Grafica.getAverage(startMonth,endMonth)
                    .then(([rows2, fieldData]) => {
                        const average = rows2.map(row => ({
                            promedio: row.promedio
                        }));
                        console.log("Promedio:");
                        average.forEach(tupla => {
                            console.log(tupla);
                        });
                        Grafica.getMax(startMonth, endMonth)
                        .then(([rows3, fieldData]) => {
                            const maximo = rows3.map(row => ({
                                maximo: row.maximo
                            }));
                            console.log("Maximo:");
                            maximo.forEach(tupla => {
                                console.log(tupla);
                            });
                        
                            Grafica.getMin(startMonth, endMonth)
                            .then(([rows4, fieldData]) => {
                                const minimo = rows4.map(row => ({
                                    minimo: row.minimo
                                }));
                                console.log("Minimo:");
                                minimo.forEach(tupla => {
                                    console.log(tupla);
                                });
                                
                                
                                Grafica.getCount(startMonth, endMonth)
                                .then(([rows5, fieldData]) => {
                                    const registers = rows5.map(row => ({
                                        total_tuplas: row.total_tuplas
                                    }));
                                    console.log("registers:");
                                    registers.forEach(tupla => {
                                        console.log(tupla);
                                    });
                                    
                                    
                                    response.render('grafica', { data: data, 
                                        opcion: opcion,
                                        caso: caso, 
                                        startMonth: startMonth, 
                                        endMonth: endMonth,
                                        titulo: "Leads con esta palabra", 
                                        average:average, 
                                        maximo: maximo, 
                                        minimo: minimo, 
                                        registers: registers,
                                        csrfToken: request.csrfToken(),
                                        username: request.session.username || '',});
                                }).catch(error => {
                                    console.log(error);
                                    response.status(500).json({ message: "Error en minimo" });
                                });
                                
                        
                            }).catch(error => {
                                console.log(error);
                                response.status(500).json({ message: "Error en minimo" });
                            });
                        }).catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error en maximo" });
                        });
                        
                    }).catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error en promedio" });
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Error creating chart" });
                });
            }
                else {
                    console.log("ENtraste al Else")
                    console.log(opcion);
                    response.render('crea-grafica', { 
                    opcion: "LastMessage", 
                    startMonth: startMonth,
                    endMonth: endMonth,
                    caso: caso,
                    titulo: "",
                    csrfToken: request.csrfToken(),
                    username: request.session.username || '',});
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
                        
                    Grafica.getAverage(startMonth,endMonth)
                    .then(([rows2, fieldData]) => {
                        const average = rows2.map(row => ({
                            promedio: row.promedio
                        }));
                        console.log("Promedio:");
                        average.forEach(tupla => {
                            console.log(tupla);
                        });
                        Grafica.getMax(startMonth, endMonth)
                        .then(([rows3, fieldData]) => {
                            const maximo = rows3.map(row => ({
                                maximo: row.maximo
                            }));
                            console.log("Maximo:");
                            maximo.forEach(tupla => {
                                console.log(tupla);
                            });
                        
                            Grafica.getMin(startMonth, endMonth)
                            .then(([rows4, fieldData]) => {
                                const minimo = rows4.map(row => ({
                                    minimo: row.minimo
                                }));
                                console.log("Minimo:");
                                minimo.forEach(tupla => {
                                    console.log(tupla);
                                });
                                
                                
                                Grafica.getCount(startMonth, endMonth)
                                .then(([rows5, fieldData]) => {
                                    const registers = rows5.map(row => ({
                                        total_tuplas: row.total_tuplas
                                    }));
                                    console.log("registers:");
                                    registers.forEach(tupla => {
                                        console.log(tupla);
                                    });
                                    
                                    
                                    response.render('grafica', { 
                                        data: data, 
                                        opcion: opcion , 
                                        caso: caso, 
                                        startMonth: startMonth, 
                                        endMonth: endMonth, 
                                        titulo: "Leads por compañia", 
                                        average:average, 
                                        maximo: maximo, 
                                        minimo: minimo, 
                                        registers: registers,
                                        csrfToken: request.csrfToken(),
                                        username: request.session.username || '',});
                                
                                }).catch(error => {
                                    console.log(error);
                                    response.status(500).json({ message: "Error en minimo" });
                                });
                            }).catch(error => {
                                console.log(error);
                                response.status(500).json({ message: "Error en minimo" });
                            });
                        }).catch(error => {
                            console.log(error);
                            response.status(500).json({ message: "Error en maximo" });
                        });
                        
                    }).catch(error => {
                        console.log(error);
                        response.status(500).json({ message: "Error en promedio" });
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
};
// grafica.controller.js


// Definir la función get_descarga_reporte
exports.get_descarga_reporte = (req, res) => {
  const reportName = req.query.reportName; // Obtener el nombre del reporte desde la solicitud

  // Crear un nuevo documento PDF
  const doc = new PDFDocument();

  // Añadir contenido al PDF
  doc.fontSize(24).text('¡Hola, este es el reporte: ' + reportName, 100, 100);

  // Guardar el PDF con el nombre especificado por el usuario
  const fileName = reportName + '.pdf';
  doc.pipe(fs.createWriteStream(fileName));
  doc.end();

  // Enviar el PDF como respuesta
  res.download(fileName, (err) => {
    if (err) {
      // Manejar errores si ocurren al descargar el archivo
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    } else {
      // Eliminar el archivo después de descargarlo
      fs.unlink(fileName, (err) => {
        if (err) console.error('Error al eliminar el archivo:', err);
      });
    }
  });
};
