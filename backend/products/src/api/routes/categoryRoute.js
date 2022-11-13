const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { categoryValidator } = require('../validator/validator');

router.get('/', categoryValidator, categoryController.getAllCategories);

router.get('/:id', categoryValidator, categoryController.getCategoryById);

router.post('/', categoryValidator, categoryController.createCategory);

router.put('/:id', categoryValidator, categoryController.updateCategory);

router.delete('/:id', categoryValidator, categoryController.deleteCategory);

module.exports = router;