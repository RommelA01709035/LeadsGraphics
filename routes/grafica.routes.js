const express = require('express');
const router = express.Router();

const graficaController = require('../controllers/grafica.controller');

router.get('/grafica',  graficaController.get_grafica);
router.post('/grafica', graficaController.post_grafica);



module.exports = router;