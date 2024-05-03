const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const isAdmin = require('../util/is-Admin');
const isSeller = require('../util/is-Seller');
const leadsController = require('../controllers/leads.controller');

router.get('/leads', isAuth, isSeller, leadsController.getLeadsPage);
router.get('/buscar/:nombre', isAuth, leadsController.buscarLeads);
router.get('/buscar', isAuth, isSeller, leadsController.buscarLeads);
router.get('/agregar-lead', isAuth, isSeller, leadsController.renderAddLeadPage);
router.get('/modificar-lead/:lead_id', isAuth, isSeller, leadsController.renderModificarLeadPage);

router.post('/modificar-lead/:lead_id', isAuth, leadsController.guardarLead);
router.post('/agregar-lead', isAuth, isSeller, leadsController.agregarLead);
router.post('/eliminar-lead', isAuth, isAdmin, leadsController.eliminarLead);
router.get('/', isAuth, isSeller, leadsController.getImportar);
router.post('/', isAuth, isSeller, leadsController.postImportar);


module.exports = router;