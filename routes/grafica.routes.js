const express = require('express');
const router = express.Router();

const PDFDocument = require('pdfkit');

const graficaController = require('../controllers/grafica.controller');

router.get('/grafica', graficaController.get_crea_grafica);
router.post('/grafica', graficaController.post_grafica);
router.get('/crea-grafica', graficaController.get_crea_grafica);
router.get('/descargar-pdf', pdfController.downloadPDF);

module.exports = router;
