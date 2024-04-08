const express = require('express');
const router = express.Router();

const controllerInicio = require('../controllers/inicio.controller');

router.get('/', controllerInicio.get_homepage);

module.exports = router;