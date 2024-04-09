const express = require('express');
const router = express.Router();

const leadsController = require('../controllers/leads.controller');

// Ruta para mostrar la página de leads
router.get('/leads', leadsController.getLeadsPage);
module.exports = router;

// Ruta para renderizar la vista de agregar lead
router.get('/agregar-lead', leadsController.renderAddLeadPage);
router.post('/agregar-lead', leadsController.agregarLead);