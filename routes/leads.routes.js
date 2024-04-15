const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const leadsController = require('../controllers/leads.controller');

router.get('/leads', isAuth, leadsController.getLeadsPage);

module.exports = router;
