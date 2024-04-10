const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');

router.get('/leads', leadsController.getLeadsPage);
router.get('/buscar/:nombre', leadsController.buscarLeads);
//router.get('/buscar/:id_lead', leadsController.buscarLeads);
router.get('/agregar-lead', leadsController.renderAddLeadPage);
router.post('/agregar-lead', leadsController.agregarLead);
router.post('/eliminar-lead', leadsController.eliminarLead);

module.exports = router;