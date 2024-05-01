const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const usuarioController = require('../controllers/usuario.controller');

router.get('/', isAuth, usuarioController.getUsuarioPage);
router.post('/reactivate-usuario', isAuth, usuarioController.post_reactivate_Usuario);
router.post('/delete-usuario', isAuth, usuarioController.post_delete_Usuario);
router.get('/signupusuario', isAuth, usuarioController.get_signup_usuario);
router.post('/signupusuario', isAuth, usuarioController.post_signup_usuario);


module.exports = router;