const express = require('express');
const router = express.Router();

const  isAuthenticated = require('../middlewares/isAuthenticated');
const orderController = require('../controllers/orderController');
router.get('/test', isAuthenticated, orderController.test);

module.exports = router;
