const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const graficaController = require('../controllers/grafica.controller');

router.get('/crea-grafica', isAuth, graficaController.get_crea_grafica);
router.post('/grafica-usuario', isAuth, graficaController.post_grafica);
router.post('/analisis-usuario', isAuth, graficaController.post_grafica_usuario); 
router.get('/', isAuth, graficaController.get_crea_grafica);

module.exports = router;
