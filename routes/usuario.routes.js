const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const usuarioController = require('../controllers/usuario.controller');

router.get('/preferencias', isAuth, usuarioController.get_preferencias);
router.get('/', isAuth, usuarioController.getUsuarioPage);
router.post('/reactivate-usuario', isAuth, usuarioController.post_reactivate_Usuario);
router.post('/delete-usuario', isAuth, usuarioController.post_delete_Usuario);


module.exports = router;