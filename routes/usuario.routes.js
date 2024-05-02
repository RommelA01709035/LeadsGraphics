const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const usuarioController = require('../controllers/usuario.controller');

router.get('/buscar/:nombre', isAuth, usuarioController.buscarUsuario);
router.get('/buscar', isAuth, usuarioController.buscarUsuario);

router.get('/', isAuth, usuarioController.getUsuarioPage);
router.get('/cuenta', isAuth, usuarioController.getCuenta);
router.post('/cuenta/cambiar-contrasenia', isAuth, usuarioController.postCambiarContrasenia);
router.post('/desactivar/:IDUsuario', usuarioController.desactivarUsuario);
router.post('/reactivar/:IDUsuario', usuarioController.reactivarUsuario);
router.get('/modificar-usuario/:IDUsuario', usuarioController.modificarUsuario);
router.post('/modificar-usuario/:IDUsuario', usuarioController.modificarUsuario);
router.post('/actualizar-usuario/:IDUsuario', usuarioController.actualizarUsuario);
router.get('/signupusuario', usuarioController.get_signup_usuario);
router.post('/signupusuario', usuarioController.post_signup_usuario);




module.exports = router;
