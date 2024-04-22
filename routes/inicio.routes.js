const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const controllerInicio = require('../controllers/inicio.controller');

router.get('/', isAuth, controllerInicio.get_homepage);

module.exports = router;