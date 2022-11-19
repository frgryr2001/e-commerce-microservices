const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');
const isAuthenticated = require('../middlewares/isAuthenticated');

const { productValidator, updateProductValidator } = require('../validator/validator');
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/',isAuthenticated, upload, productValidator, productController.createProduct);

router.put('/:id',isAuthenticated, upload, updateProductValidator, productController.updateProduct);

router.delete('/:id',isAuthenticated, productController.deleteProduct);

router.get('/option/:id', productController.getProductOptions);

module.exports = router;
