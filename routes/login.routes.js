const express = require('express');
const router = express.Router();

const controllerLogin = require('../controllers/login.controller');

router.get('/login', controllerLogin.get_login);
router.post('/login', controllerLogin.post_login);
router.get('/logout', controllerLogin.get_logout);

module.exports = router;