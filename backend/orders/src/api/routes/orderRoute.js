const express = require('express');
const router = express.Router();
const { feeShipValidator, orderValidator } = require('../validator/validator');
const isAuthenticated = require('../middlewares/isAuthenticated');
const orderController = require('../controllers/orderController');
const isAdmin = require('../middlewares/roleCheck');

router.get('/test', isAuthenticated, orderController.test);
// Tính phí ship đơn hàng - user
/**
* @swagger
* /api/orders/shipping-fees:
*   post:
*     summary: Calculate the shipping fees
*     tags: [Order]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               district_id:
*                  type: number
*                  description: Id of district
*                  default: 1566
*               ward_id:
*                 type: string
*                 description: Id of ward
*                 default: 123456
*               quantity:
*                 type: number
*                 description: quantity
*                 default: 10
*     responses:
*       200:
*         description: Calculate shipping fees fail successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thành công
*                 message:
*                    type: string
*                    default: Tính phí vận chuyển thành công!
*                 shipping_fee:
*                    type: number
*                    default: 90006
*       400:
*         description: Calculate shipping fees fail
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thất bại
*                 message:
*                    type: string
*                    default: Có lỗi xảy ra khi tính phí vận chuyển, vui lòng thử lại!
*                 err:
*                    type: string
*/
router.post('/shipping-fees', feeShipValidator, orderController.getShippingFee);
// Tạo đơn hàng - user
/**
* @swagger
* /api/orders/create:
*   post:
*     summary: Create order
*     tags: [Order]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               province_id:
*                  type: number
*                  description: Id of province
*                  default: 269
*               district_id:
*                 type: string
*                 description: Id of district
*                 default: 1449
*               ward_id:
*                 type: number
*                 description: Id of ward
*                 default: 10
*               address:
*                 type: string
*                 description: Address
*                 default: 19 nguyễn hữu thọ
*               voucher_code:
*                 type: string
*                 description: Address
*                 default: codeptl123456
*               products:
*                 type: object
*                 description: Products object
*                 properties: 
*                   product_id: 
*                     type: string
*                     default: 63785b15c7bb12cf51b24133
*                   product_option_id: 
*                     type: string
*                     default: 63785b15c7bb12cf51b24135
*                   quantity: 
*                     type: number
*                     default: 20
*                   price: 
*                     type: number
*                     default: 200000
*                   size: 
*                     type: string
*                     default: 20
*                   color: 
*                     type: string
*                     default: đỏ
*     responses:
*       200:
*         description: Create order successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thành công
*                 message:
*                    type: string
*                    default: Đặt hàng thành công đơn hàng của bạn đang được xử lý!
*       400:
*         description: Create order error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thất bại
*                 message:
*                    type: string
*                    default: Có lỗi xảy ra khi tính phí vận chuyển, vui lòng thử lại!
*                 err:
*                    type: string
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*       500:
*         description: Some server error
*/
router.post('/create', isAuthenticated, orderValidator, orderController.createOrder);
// Lấy tất cả đơn hàng - admin
/**
* @swagger
* /api/orders:
*   get:
*     summary: Get all orders
*     tags: [Order]
*     responses:
*       200:
*         description: Get all orders succesfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 order:
*                    type: object
*                    default: []
*                 status:
*                    type: string
*                    default: Thành công
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*       500:
*         description: Get all order error
*/
router.get('/', isAuthenticated, isAdmin, orderController.getAllOrders);
// Lấy tất cả đơn hàng - admin
/**
* @swagger
* /api/orders/my-order:
*   get:
*     summary: Get the orders of user
*     tags: [Order]
*     responses:
*       200:
*         description: Get the order of user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thành công
*                 order:
*                    type: object
*                    default: []
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*       500:
*         description: Get the order error
*/
router.get('/my-order', isAuthenticated, orderController.getOrderByEachUser);
// THay đổi trạng thái đơn hàng - admin
/**
* @swagger
* /api/orders/change-status:
*   post:
*     summary: Update status of the order
*     tags: [Order]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                  type: string
*                  description: Id of order
*                  default: 6378544bf434f40263e03bf0
*               status:
*                 type: number
*                 description: Status of order
*                 default: 1
*     responses:
*       200:
*         description: Update status of the order succesfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thành công
*                 message:
*                    type: string
*                    default: Cập nhật trạng thái đơn hàng thành công!
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*       400:
*         description: Update status of the order fail
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thất bại
*                 message:
*                    type: string
*                    default: Cập nhật trạng thái đơn hàng thất bại!
*       500:
*         description: Get the order error
*/
router.post('/change-status', isAuthenticated, isAdmin, orderController.changeStatus);
// Lấy đơn hàng theo id - admin
/**
* @swagger
* /api/orders/{id}:
*   delete:
*     summary: Delete the orders by id
*     tags: [Order]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The id of order
*     responses:
*       200:
*         description: Delete the orders by id successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thành công
*                 message:
*                    type: string
*                    default: Xóa đơn hàng thành công!
*       400:
*         description: Delete the orders by id fail
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                    type: string
*                    default: Thất bại
*                 message:
*                    type: string
*                    default: Xóa đơn hàng thất bại!
*       403:
*         description: Not Authenticated
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 msg:
*                    type: string
*                    default: You are Authenticated 
*       500:
*         description: Delete the order error
*/
router.delete('/:id', isAuthenticated, isAdmin, orderController.deleteOrder);

module.exports = router;
