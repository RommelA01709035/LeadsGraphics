const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/login', usuarioController.get_login);
router.post('/login', usuarioController.post_login);
router.get('/logout', usuarioController.get_logout);
router.get('/usuarios', usuarioController.getUsuarioPage);

module.exports = router;