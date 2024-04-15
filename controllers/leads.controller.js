const Leads = require('../models/leads.model');
const pool = require('../util/database');

exports.getLeadsPage = async (req, res) => {
    try {
        const [leads, fieldData] = await Leads.fetchAll();

        console.log(leads);
        res.render('consultar_lead', {leads: leads ,csrfToken: request.csrfToken(),});

        // No es necesario crear una instancia de Leads aquí
    } catch (error) {
        console.error('Error al obtener leads:', error);
        res.status(500).send('Error al obtener leads');
    }
};

exports.renderAddLeadPage = async (req, res) => {
    try {
        // Renderiza la vista de agregar lead
        res.render('agregar_lead');
    } catch (error) {
        console.error('Error al renderizar la vista de agregar lead:', error);
        res.status(500).send('Error al renderizar la vista de agregar lead');
    }
};

exports.agregarLead = async (req, res) => {
    try {
        // Filtrar los valores undefined del cuerpo de la solicitud
        const formData = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v !== undefined));

        console.log(formData);

        const convertToNull = (value) => (value === undefined ? null : value);

        // Crear un nuevo objeto Lead con los datos del formulario
        const nuevoLead = new Leads({
            IDHistorial: formData.IDHistorial !== undefined ? convertToNull(formData.IDHistorial) : null,
            IDWorkspace: formData.IDWorkspace !== undefined ? convertToNull(formData.IDWorkspace) : null,
            Telefono: formData.Telefono !== undefined ? convertToNull(formData.Telefono) : null,
            Nombre: formData.Nombre !== undefined ? convertToNull(formData.Nombre) : null,
            Valor: formData.Valor !== undefined ? convertToNull(formData.Valor) : null,
            Ganado: formData.Ganado !== undefined ? convertToNull(formData.Ganado) : null,
            Correo: formData.Correo !== undefined ? convertToNull(formData.Correo) : null,
            Etiqueta: formData.Etiqueta !== undefined ? convertToNull(formData.Etiqueta) : null,
            Compania: formData.Compania !== undefined ? convertToNull(formData.Compania) : null,
            Fecha_Primer_Mensaje: formData.Fecha_Primer_Mensaje !== undefined ? convertToNull(formData.Fecha_Primer_Mensaje) : null,
            Hora_Primer_Mensaje: formData.Hora_Primer_Mensaje !== undefined ? convertToNull(formData.Hora_Primer_Mensaje) : null,
            Primer_Mensaje: formData.Primer_Mensaje !== undefined ? convertToNull(formData.Primer_Mensaje) : null,
            Fecha_Ultimo_Mensaje: formData.Fecha_Ultimo_Mensaje !== undefined ? convertToNull(formData.Fecha_Ultimo_Mensaje) : null,
            Hora_Ultimo_Mensaje: formData.Hora_Ultimo_Mensaje !== undefined ? convertToNull(formData.Hora_Ultimo_Mensaje) : null,
            Ultimo_Mensaje: formData.Ultimo_Mensaje !== undefined ? convertToNull(formData.Ultimo_Mensaje) : null,
            Estado_Lead: formData.Estado_Lead !== undefined ? convertToNull(formData.Estado_Lead) : null,
            Seller_Asignado: formData.Seller_Asignado !== undefined ? convertToNull(formData.Seller_Asignado) : null,
            Embudo: formData.Embudo !== undefined ? convertToNull(formData.Embudo) : null,
            Etapa: formData.Etapa !== undefined ? convertToNull(formData.Etapa) : null,
            Archivado: formData.Archivado !== undefined ? convertToNull(formData.Archivado) : null,
            Creado_Manualmente: formData.Creado_Manualmente !== undefined ? convertToNull(formData.Creado_Manualmente) : null
        });
        
        // Guardar el nuevo lead en la base de datos
        await nuevoLead.save();

        // Redirigir a la página de leads después de guardar
        res.redirect('/leads');
    } catch (error) {
        console.error('Error al agregar lead:', error);
        res.status(500).send('Error al agregar lead');
    }

    };
    
    exports.buscarLeads = async (req, res) => {
        try {
            const nombre = req.params.nombre;
            const leads = await Leads.buscarPorNombre(nombre);

            console.log('Datos de leads encontrados:', leads); // Agrega este log para imprimir los datos encontrados

        
            res.status(200).json(leads);
        } catch (error) {
            console.error('Error al buscar leads:', error);
            res.status(500).json({ error: 'Ocurrió un error al buscar leads' });
        }

    };

    exports.renderModificarLeadPage = async (req, res) => {
        try {

            const leadId = req.params.lead_id;

            const [lead, fieldData] = await Leads.fetchOne(leadId);
            

            // Verificar si se encontró el lead
            if (lead.length == 0) {
                // Si el lead no se encuentra, puedes manejar el error o redirigir a alguna página de error
                return res.status(404).render('error404', { message: 'Lead no encontrado' });
            }

            else{

                console.log('Datos del lead en renderModificarLeadPage:', lead);

            // Renderiza la vista de modificar lead
            res.render('modificar_lead', { lead: lead[0] });

            }

        } catch (error) {
            console.error('Error al renderizar la vista de modificar lead:', error);
            res.status(500).send('Error al renderizar la vista de modificar lead');
        }
    };

    exports.guardarLead = async (req, res) => {
        const leadId = req.params.lead_id; // Obtener el ID del lead de los parámetros de la URL
        const leadData = req.body; // Obtener los datos del lead del cuerpo de la solicitud
    
        try {

            console.log('Nuevos datos modificados:', leadData);

            // Actualizar el lead en la base de datos utilizando el modelo
            const lead = await Leads.actualizarLead(leadId, leadData);
    
            // Enviar una respuesta al cliente
            res.redirect('/leads');

        } catch (error) {
            console.error('Error al guardar lead:', error);
            res.status(500).json({ error: 'Ocurrió un error al guardar el lead' });
        }
    };