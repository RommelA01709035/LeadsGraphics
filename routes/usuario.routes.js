const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const isOwner = require('../util/is-Owner');
const isAdmin = require('../util/is-Admin');
const isSeller = require('../util/is-Seller');
const usuarioController = require('../controllers/usuario.controller');

router.get('/buscar/:nombre', isAuth, usuarioController.buscarUsuario);
router.get('/buscar', isAuth, isAdmin, usuarioController.buscarUsuario);

router.get('/', isAuth, isAdmin, usuarioController.getUsuarioPage);
router.get('/cuenta', isAuth, isSeller, usuarioController.getCuenta);
router.post('/cuenta/cambiar-contrasenia', isAuth, isSeller, usuarioController.postCambiarContrasenia);
router.post('/desactivar/:IDUsuario', isAuth, isOwner, usuarioController.desactivarUsuario);
router.post('/reactivar/:IDUsuario', isAuth, isOwner, usuarioController.reactivarUsuario);
router.get('/modificar-usuario/:IDUsuario', isAuth, isAdmin, usuarioController.modificarUsuario);
router.post('/modificar-usuario/:IDUsuario', isAuth, isAdmin, usuarioController.modificarUsuario);
router.post('/actualizar-usuario/:IDUsuario', isAuth, isAdmin, usuarioController.actualizarUsuario);
router.get('/signupusuario', isAuth, isAdmin, usuarioController.get_signup_usuario);
router.post('/signupusuario', isAuth, isAdmin, usuarioController.post_signup_usuario);




module.exports = router;
