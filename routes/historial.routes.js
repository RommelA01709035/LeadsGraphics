const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const isAdmin = require('../util/is-Admin');
const controllerInicio = require('../controllers/historial.controller');

router.get('/', isAuth, isAdmin, controllerInicio.get_historial);


module.exports = router;