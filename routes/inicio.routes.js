const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/inicio.controller');

router.get('/login', usuariosController.get_login);
router.post('/login', usuariosController.post_login);
router.get('/dashboard', usuariosController.get_dashboard);

module.exports = router;

