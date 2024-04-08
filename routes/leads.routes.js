const express = require('express');
const router = express.Router();

const leadsController = require('../controllers/leads.controller');

// Ruta para mostrar la página de leads
router.get('/leads', leadsController.getLeadsPage);
module.exports = router;
