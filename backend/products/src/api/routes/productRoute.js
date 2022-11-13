const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

const {
	productValidator,
	uploadValidator,
	updateProductValidator,
} = require('../validator/validator');
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post(
	'/',
	/* uploadValidator, */ upload,
	productValidator,
	productController.createProduct
);

router.put('/:id', upload, updateProductValidator, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
