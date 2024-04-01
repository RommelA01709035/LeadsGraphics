const express = require('express');
const router = express.Router();

const leadsController = require('../controllers/leads.controller');

router.get('/leads', leadsController.getLeadsPage);

module.exports = router;
