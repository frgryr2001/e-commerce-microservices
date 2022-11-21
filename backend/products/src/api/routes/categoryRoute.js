const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { categoryValidator } = require('../validator/validator');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/roleCheck');
// Lấy tất cả danh mục - all
/**
 * @swagger
 * /api/category/:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Get all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 categories:
 *                    type: array
 *                    default: []
 *       500:
 *         description: Get all categories error
 */
router.get('/', categoryController.getAllCategories);
// Lấy danh mục theo id - all
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Get category by id
 *     responses:
 *       200:
 *         description: Get category by id success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 categories:
 *                    type: object
 *                    default: []
 *       400:
 *         description: Get category by id fail
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
 *                    default: Không tìm thấy danh mục
 *       500:
 *         description: Get the category error
 */
router.get('/:id', categoryController.getCategoryById);
// Tạo danh mục - admin
/**
 * @swagger
 * /api/category/:
 *   post:
 *     summary: Create new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  default: category name
 *     responses:
 *       200:
 *         description: Create new category success
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
 *                    default: Thêm danh mục mới thành công
 *                 categories:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        default: category-sample
 *                      slug:
 *                        type: string
 *                        default: category-sample
 *                      _id:
 *                        type: string
 *                        default: 637b9ceaaab53c8784801311
 *                      createdAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      updatedAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      __v:
 *                        type: string
 *                        default: 0
 *       400:
 *         description: Create category by id fail
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
 *                    default: Thêm danh mục thất bại!
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
 *         description: Create the category error
 */
router.post(
	'/',
	isAuthenticated,
	isAdmin,
	categoryValidator,
	categoryController.createCategory
);
// Tạo danh mục - admin
/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *                  default: category name
 *               slug:
 *                  type: string
 *                  default: category slug 
 *     responses:
 *       200:
 *         description: Update category success
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
 *                    default: Cập nhật danh mục thành công
 *                 category:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        default: category-sample
 *                      slug:
 *                        type: string
 *                        default: category-sample
 *                      _id:
 *                        type: string
 *                        default: 637b9ceaaab53c8784801311
 *                      createdAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      updatedAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      __v:
 *                        type: string
 *                        default: 0
 *       400:
 *         description: Update category by id fail
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
 *                    default: Cập nhật danh mục thất bại!
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
 *         description: Update category error
 */
// Cập nhật danh mục - admin
router.put('/:id', isAuthenticated,isAdmin, categoryValidator, categoryController.updateCategory);
// Xóa danh mục - admin
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: The Category by id
 *     responses:
 *       200:
 *         description: Delete category by id success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    default: Thành công
 *                 category:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        default: category-sample
 *                      slug:
 *                        type: string
 *                        default: category-sample
 *                      _id:
 *                        type: string
 *                        default: 637b9ceaaab53c8784801311
 *                      createdAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      updatedAt:
 *                        type: string
 *                        default: 2022-11-21T15:44:42.782Z
 *                      __v:
 *                        type: string
 *                        default: 0
 *       400:
 *         description: Delete category by id fail
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
 *                    default: Không tìm thấy danh mục
 *       500:
 *         description: Delete category by id fail
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
 *                    default: Xoá danh mục thất bại
 */
router.delete('/:id', isAuthenticated,isAdmin, categoryController.deleteCategory);

module.exports = router;
