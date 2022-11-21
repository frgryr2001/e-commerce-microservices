const express = require("express");
const router = express.Router();
const { feeShipValidator, orderValidator } = require("../validator/validator");
const isAuthenticated = require("../middlewares/isAuthenticated");
const orderController = require("../controllers/orderController");
const isAdmin = require("../middlewares/roleCheck");
/** 
*@swagger
*components:
*   schemas:
*     Product:
*       type: object
*       required:
*         -product_id
*         -product_option_id
*         -quantity
*         -price
*         -size
*         -color
*       properties:
*         product_id:
*           type: string
*           description: Id of product
*         product_option_id:
*           type: string
*           description: product option Id
*         quantity:
*           type: number
*           description: quantity
*         price:
*           type: number
*           description: Price of product
*         size: 
*           type: number
*           description: Size of product
*         color: 
*          type: string  
*          description: Color of district
*       example:
*         product_id : 637b8a1b0922b5e669b8cdc3
*         product_option_id : 637b8a1b0922b5e669b8cdc5
*         quantity: 1
*         price: 200000
*         size: 20
*         color: đỏ
*/

router.get("/test", isAuthenticated, orderController.test);
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
router.post("/shipping-fees", feeShipValidator, orderController.getShippingFee);
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
 *                 type: number
 *                 description: Id of district
 *                 default: 1449
 *               ward_id:
 *                 type: string
 *                 description: Id of ward
 *                 default: 20710
 *               address:
 *                 type: string
 *                 description: Address
 *                 default: 19 nguyễn hữu thọ
 *               voucher_code:
 *                 type: string
 *                 description: voucher
 *                 default: codeptl123456
 *               products:
 *                  type: array
 *                  items:
 *                   $ref: '#/components/schemas/Product'            
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
router.post(
  "/create",
  isAuthenticated,
  orderValidator,
  orderController.createOrder
);
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
router.get("/", isAuthenticated, isAdmin, orderController.getAllOrders);
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
router.get("/my-order", isAuthenticated, orderController.getOrderByEachUser);
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
router.post("/change-status", isAuthenticated, orderController.changeStatus);
router.delete("/:id", isAuthenticated, isAdmin, orderController.deleteOrder);

module.exports = router;
