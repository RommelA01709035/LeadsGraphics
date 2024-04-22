const express = require('express');
const router = express.Router();

const controllerLogin = require('../controllers/login.controller');

router.get('/login', controllerLogin.get_login);
router.post('/login', controllerLogin.post_login);
router.get('/logout', controllerLogin.get_logout);
router.get('/signup', controllerLogin.get_signup);
router.post('/signup', controllerLogin.post_signup)
router.get('/signupusuario', controllerLogin.get_signup_usuario);
router.post('/signupusuario', controllerLogin.post_signup_usuario)


module.exports = router;