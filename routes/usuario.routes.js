const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/usuarios', usuarioController.getUsuarioPage);


module.exports = router;