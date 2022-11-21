const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const upload = require('../middlewares/uploadMiddleware');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/roleCheck');

const { productValidator, updateProductValidator } = require('../validator/validator');
/** 
*@swagger
*components:
*   schemas:
*     Product:
*       type: object
*       required:
*       example:
*         status: Thành công
*         message: Thêm sản phẩm thành công
*         product:
*           name: '123213'
*           price: 10000000
*           description: iphone13
*           category_id: 6371f5312a44efd729da08f4
*           category: name
*           manufacture: apple
*           slug: 123213-1669040670042
*           product_options:
*           - product_id: 637b8a1b0922b5e669b8cdc3
*             size: '46'
*             quantity: 10
*             color: d?
*             _id: 637b8a1b0922b5e669b8cdc5
*             createdAt: '2022-11-21T14:24:30.041Z'
*             updatedAt: '2022-11-21T14:24:30.041Z'
*           status: true
*           _id: 637b8a1b0922b5e669b8cdc3
*           images:
*           - product_id: 637b8a1b0922b5e669b8cdc3
*             image_name: 18a3922d08e7.jpg
*             image_url: https://i.ibb.co/SNPwT5g/18a3922d08e7.jpg
*             delete_url: https://ibb.co/v1H45VW/cdda5d372db2344b0c3d2d64408a457d
*             _id: 637b8a1e0922b5e669b8cdc6
*           createdAt: '2022-11-21T14:24:30.042Z'
*           updatedAt: '2022-11-21T14:24:30.042Z'
*           __v: 0
*/
// Lấy tất cả sản phẩm - all
/**
 * @swagger
 * /api/products/:
 *   get:
 *     summary: Get all product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Get all product success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 product:
 *                    type: array
 *                    default: []
 *       400:
 *         description: Get all product fail
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
 *                    default: Lấy danh sách sản phẩm thất bại
 *       500:
 *         description: Get all product error
 */
router.get('/', productController.getAllProducts);
// Lấy sản phẩm theo id - all
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Product]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The product id
 *     responses:
 *       200:
 *         description: Get product by id success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 product:
 *                    type: object
 *                    $ref: '#/components/schemas/Product'     
 *       400:
 *         description: Get product by id fail
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
 *                    default: Lấy sản phẩm thất bại
 *       500:
 *         description: Get the product error
 */
router.get('/:id', productController.getProductById);
// Tạo sản phẩm - admin
/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Create products
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Product'         
 *     responses:
 *       200:
 *         description: Create product successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 message:
 *                    type: string
 *                    default: Tạo sản phẩm thành công!    
 *       400:
 *         description: Create product error
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
 *                    default: Tạo sản phẩm thất bại!
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
	'/',
	isAuthenticated,
	isAdmin,
	upload,
	productValidator,
	productController.createProduct
);
// Cập nhật sản phẩm - admin
/**
 * @swagger
 * /api/products/:
 *   put:
 *     summary: Update products
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Product'         
 *     responses:
 *       200:
 *         description: Update product successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 message:
 *                    type: string
 *                    default: Cập nhật sản phẩm thành công!    
 *       400:
 *         description: Update product error
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
 *                    default: Cập nhật sản phẩm thất bại!
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
router.put(
	'/:id',
	isAuthenticated,
	isAdmin,
	upload,
	updateProductValidator,
	productController.updateProduct
);
// Xóa sản phẩm - admin
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by id
 *     tags: [Product]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The product id
 *     responses:
 *       200:
 *         description: Delete product by id success
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
 *                    default:  Xoá sản phẩm hành công   
 *       400:
 *         description: Delete product by id fail
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
 *                    default: Xoá sản phẩm thất bại
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
 *         description: Delete product error
 */
router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct);
// Ẩn sản phẩm - admin
/**
 * @swagger
 * /api/products/hide/{id}:
 *   get:
 *     summary: Hide product by id
 *     tags: [Product]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The product id
 *     responses:
 *       200:
 *         description: Hide product by id success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 message:
 *                    type: string
 *                    default:  Ẩn sản phẩm hành công   
 *       400:
 *         description: Hide product by id fail
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
 *                    default: Ẩn sản phẩm thất bại
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
 *         description: Hide product error
 */
router.get('/hide/:id', isAuthenticated, isAdmin, productController.hideProduct);
// Lấy kiểu sản phẩm bằng id sản phẩm - all
/**
 * @swagger
 * /api/products/option/{id}:
 *   get:
 *     summary: Get product option by product_option
 *     tags: [Product]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The product_option id
 *     responses:
 *       200:
 *         description: Get product option by product_option success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 product_option:
 *                    type: object
 *       400:
 *         description: Get product option by product_option fail
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
 *                    default: Lấy kiểu sản phẩm  thất bại
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
 *         description: Hide product error
 */
router.get('/option/:id', productController.getProductOptions);
/**
 * @swagger
 * /api/products/update-quantity:
 *   post:
 *     summary: Update quantity of product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                  type: string
 *                  default: 637921a09a7e12afc6ad5fc3
 *               product_option_id:
 *                  type: string
 *                  default: 637baa67ee50abca4ad6686a
 *               quantity:
 *                  type: number
 *                  default: 10
 *               price:
 *                  type: number
 *                  default: 200000
 *               size:
 *                  type: string
 *                  default: 20
 *               color:
 *                  type: string
 *                  default: đỏ
 *     responses:
 *       200:
 *         description: Update quantity of product success
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
 *                    default: Cập nhật số lượng sản phẩm thành công
 *       400:
 *         description: Update quantity of product fail
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
 *                    default: Cập nhật số lượng sản phẩm thất bại
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
 *         description: Update quantity of product error
 */
router.post('/update-quantity', productController.updateQuantity);

module.exports = router;
