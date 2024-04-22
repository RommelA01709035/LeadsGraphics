const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const graficaController = require('../controllers/grafica.controller');
const reporteController = require('../controllers/reporte.controller');

router.get('/grafica', isAuth, graficaController.get_crea_grafica);
router.post('/grafica', isAuth, graficaController.post_grafica);
router.get('/crea-grafica', isAuth, graficaController.get_crea_grafica);
router.post('/descarga-reporte', isAuth, reporteController.post_reporte);
module.exports = router;
