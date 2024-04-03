const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/usuarios', usuarioController.getUsuarioPage);
router.get('/modify-usuario', usuarioController.get_modify_Usuario);

module.exports = router;