const express = require('express');
const router = express.Router();
const { feeShipValidator, orderValidator } = require('../validator/validator');
const isAuthenticated = require('../middlewares/isAuthenticated');
const orderController = require('../controllers/orderController');
const isAdmin = require('../middlewares/roleCheck');

router.get('/test', isAuthenticated, orderController.test);
// Tính phí ship đơn hàng - user
router.post('/shipping-fees', feeShipValidator, orderController.getShippingFee);
// Tạo đơn hàng - user
router.post('/create', isAuthenticated, orderValidator, orderController.createOrder);
// Lấy tất cả đơn hàng - admin
router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders);
// Lấy đơn hàng theo của mình - user
router.get('/my-order', isAuthenticated, orderController.getOrderByEachUser);
// THay đổi trạng thái đơn hàng - admin
router.post('/change-status', isAuthenticated, isAdmin, orderController.changeStatus);
// Lấy đơn hàng theo id - admin
router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder);

module.exports = router;
