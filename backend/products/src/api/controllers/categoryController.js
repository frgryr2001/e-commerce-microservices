const Category = require('../models/categoryModel');
const { validationResult } = require("express-validator");

//
// @route   GET api/categories
// @desc    Get all categories
// @access  Public

export class CategoryController {
	async getAllCategories(req, res) {
		try {
			const categories = await Category.find();
			res.status(200).json(categories);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}

	//
	// @route   GET api/categories/:id
	// @desc    Get category by id
	// @access  Public

	async getCategoryById(req, res) {
		try {
			const category = await Category.findById(req.params.id);
			res.status(200).json(category);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}

	//
	// @route   POST api/categories
	// @desc    Create a category
	// @access  Private
	
	async createCategory(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({status:"Thất bại",
			 errors: errors.array()[0].msg });
		}else {
			const {name} = req.body;
			try {
				let category = await Category.findOne({name});
				if (category) {
					return res.status(400).json({status:"Thất bại",
					errors: 'Danh mục đã tồn tại' });
				}
				category = new Category({
					name,
				});
				await category.save();
				res.status(200).json({status:"Thành công", category});
			}
			catch (err) {
				console.error(err.message);
				res.status(500).json('Server Error');
			}
		}
	}

	//
	// @route   PUT api/categories/:id
	// @desc    Update a category
	// @access  Private

	async updateCategory(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({status:"Thất bại",
			 errors: errors.array()[0].msg });
		}else {
			const {name} = req.body;
			try {
				let category = await Category.findById(req.params.id);
				if (!category) {
					return res.status(400).json({status:"Thất bại",
					errors: 'Danh mục không tồn tại' });
				}
				category.name = name;
				await category.save();
				res.status(200).json({status:"Thành công", category});
			}
			catch (err) {
				console.error(err.message);
				res.status(500).json('Server Error');
			}
		}
	}

	// 
	// @route   DELETE api/categories/:id
	// @desc    Delete a category
	// @access  Private

	async deleteCategory(req, res) {
		try {
			const category = await Category.findById(req.params.id);
			if (!category) {
				return res.status(400).json({status:"Thất bại",
				errors: 'Danh mục không tồn tại' });
			}
			await category.remove();
			res.status(200).json({status:"Thành công", category});
		}
		catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}

	
}
