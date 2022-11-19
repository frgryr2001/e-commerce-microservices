const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const upload = require('../middlewares/uploadMiddleware');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/roleCheck');

const { productValidator, updateProductValidator } = require('../validator/validator');


// Lấy tất cả sản phẩm - all
router.get('/', productController.getAllProducts);
// Lấy sản phẩm theo id - all
router.get('/:id', productController.getProductById);
// Tạo sản phẩm - admin
router.post(
	'/',
	isAuthenticated,
	isAdmin,
	upload,
	productValidator,
	productController.createProduct
);
// Cập nhật sản phẩm - admin
router.put(
	'/:id',
	isAuthenticated,
	isAdmin,
	upload,
	updateProductValidator,
	productController.updateProduct
);
// Xóa sản phẩm - admin
router.delete('/:id', isAuthenticated, isAdmin, productController.deleteProduct);
// Ẩn sản phẩm - admin
router.get('/hide/:id', isAuthenticated, isAdmin, productController.hideProduct);
// Lấy kiểu sản phẩm bằng id sản phẩm - all
router.get('/option/:id', productController.getProductOptions);

module.exports = router;
