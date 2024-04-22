const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const controllerInicio = require('../controllers/historial.controller');

router.get('/', isAuth, controllerInicio.get_historial);


module.exports = router;