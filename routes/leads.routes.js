const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads.controller');

router.get('/leads', leadsController.getLeadsPage);
router.get('/buscar/:nombre', leadsController.buscarLeads);
router.get('/agregar-lead', leadsController.renderAddLeadPage);
router.get('/modificar-lead/:lead_id', leadsController.renderModificarLeadPage);

router.post('/agregar-lead', leadsController.agregarLead);


module.exports = router;