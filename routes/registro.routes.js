const express = require('express');
const router = express.Router();

const controllerRegistro = require('../controllers/registro.controller');

router.get('/registro', controllerRegistro.get_registro);
router.post('/registro', controllerRegistro.post_registro);

module.exports = router;