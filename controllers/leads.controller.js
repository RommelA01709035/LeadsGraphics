const Leads = require('../models/leads.model');

exports.getLeadsPage = async (req, res) => {
    try {
        const [leads,fieldData]= await Leads.fetchAll();

        console.log(leads)
        res.render('consultar_lead', {leads: leads });

        const instanciaLead = new Leads("nombre", "correo", "compania", "telefono");
        console.log("Instancia del modelo creada:", instanciaLead);


    } catch (error) {
        console.error('Error al obtener leads:', error);
        res.status(500).send('Error al obtener leads');
    }
};