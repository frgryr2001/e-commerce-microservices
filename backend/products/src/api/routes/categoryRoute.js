const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { categoryValidator } = require('../validator/validator');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/roleCheck');

// Lấy tất cả danh mục - all
router.get('/', categoryController.getAllCategories);
// Lấy danh mục theo id - all
router.get('/:id', categoryController.getCategoryById);
// Tạo danh mục - admin
router.post(
	'/',
	isAuthenticated,
	isAdmin,
	categoryValidator,
	categoryController.createCategory
);
// Cập nhật danh mục - admin
router.put('/:id', isAuthenticated,isAdmin, categoryValidator, categoryController.updateCategory);
// Xóa danh mục - admin
router.delete('/:id', isAuthenticated,isAdmin, categoryController.deleteCategory);

module.exports = router;
