const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/usuarios', usuarioController.getUsuarioPage);
router.post('/registrar', usuarioController.post_delete_Usuario);

module.exports = router;