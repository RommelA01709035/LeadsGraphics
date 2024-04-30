const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const usuarioController = require('../controllers/usuario.controller');

router.get('/buscar/:nombre', isAuth, usuarioController.buscarUsuario);
router.get('/buscar', isAuth, usuarioController.buscarUsuario);

router.get('/', isAuth, usuarioController.getUsuarioPage);
router.post('/desactivar/:IDUsuario', usuarioController.desactivarUsuario);
router.post('/reactivar/:IDUsuario', usuarioController.reactivarUsuario);
router.get('/modificar-usuario/:IDUsuario', usuarioController.modificarUsuario);
router.post('/modificar-usuario/:IDUsuario', usuarioController.modificarUsuario);




module.exports = router;
