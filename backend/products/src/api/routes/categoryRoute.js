const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidator } = require('../validator/validator');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', isAuthenticated, categoryValidator, categoryController.createCategory);

router.put('/:id', isAuthenticated, categoryValidator, categoryController.updateCategory);

router.delete('/:id', isAuthenticated, categoryController.deleteCategory);

module.exports = router;
