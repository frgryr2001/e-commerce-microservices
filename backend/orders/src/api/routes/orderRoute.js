const express = require('express');
const router = express.Router();
const { feeShipValidator, orderValidator } = require('../validator/validator');
const isAuthenticated = require('../middlewares/isAuthenticated');
const orderController = require('../controllers/orderController');
router.get('/test', isAuthenticated, orderController.test);
router.post('/shipping-fees', feeShipValidator, orderController.getShippingFee);

router.post('/create', isAuthenticated,orderValidator, orderController.createOrder);
router.get('/', isAuthenticated, orderController.getAllOrders);
router.get('/my-order', isAuthenticated, orderController.getOrderByEachUser);
router.post('/change-status', isAuthenticated, orderController.changeStatus);
router.delete('/:id', isAuthenticated, orderController.deleteOrder);
module.exports = router;
