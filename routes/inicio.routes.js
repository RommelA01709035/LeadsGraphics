const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const isSeller = require('../util/is-Seller');
const controllerInicio = require('../controllers/inicio.controller');

router.get('/', isAuth, isSeller, controllerInicio.get_homepage);

module.exports = router;