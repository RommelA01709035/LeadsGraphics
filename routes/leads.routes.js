const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const leadsController = require('../controllers/leads.controller');

router.get('/leads', isAuth, leadsController.getLeadsPage);
router.get('/buscar/:nombre', isAuth, leadsController.buscarLeads);
router.get('/buscar', isAuth, leadsController.buscarLeads);
router.get('/agregar-lead', isAuth, leadsController.renderAddLeadPage);
router.get('/modificar-lead/:lead_id', isAuth, leadsController.renderModificarLeadPage);

router.post('/modificar-lead/:lead_id', isAuth, leadsController.guardarLead);
router.post('/agregar-lead', isAuth, leadsController.agregarLead);
router.post('/eliminar-lead', isAuth, leadsController.eliminarLead);
router.get('/', isAuth, leadsController.getImportar);
router.post('/', isAuth, leadsController.postImportar);


module.exports = router;