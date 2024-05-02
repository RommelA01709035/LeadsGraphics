const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const isOwner = require('../util/is-Owner');
const isAdmin = require('../util/is-Admin');
const isSeller = require('../util/is-Seller');
const graficaController = require('../controllers/grafica.controller');


router.get('/crea-grafica', isAuth, isSeller, graficaController.get_crea_grafica);
router.post('/grafica-usuario', isAuth, isSeller, graficaController.post_grafica);
router.post('/analisis-usuario', isAuth, isSeller, graficaController.post_grafica_usuario); 
router.get('/', isAuth, isSeller, graficaController.get_crea_grafica);

module.exports = router;
