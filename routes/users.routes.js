const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.get_users_delete);
router.post('/', usersController.post_users_delete);


module.exports = router;