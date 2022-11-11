import axios from 'axios';
const Product = require('../models/productModel');
const ProductOption = require('../models/product_optionModel');
const Category = require('../models/categoryModel');



export class ProductController {
	async getAllProducts(req, res) {
		try {
			const products = await Product.find();
			res.status(200).json(products);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}

	//
	// @route   GET api/products/:id
	// @desc    Get product by id

	async getProductById(req, res) {
		try {
			const product = await Product.findById(req.params.id);
			res.status(200).json(product);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server Error');
		}
	}

	//
	// @route   POST api/products
	// @desc    Create a product	

	async createProduct(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({status:"Thất bại",
			 errors: errors.array()[0].msg });
		}else {
			const {name, description, price, category_id} = req.body;
			try {
				let product = await Product.findOne({name});
				if (product) {
					return res.status(400).json({status:"Thất bại",
					errors: 'Sản phẩm đã tồn tại' });
				}
				product = new Product({
					name,
					description,
					price,
					category,
					product_options
				});
				await product.save();
				res.status(200).json({status:"Thành công", product});
			}
			catch (err) {
				console.error(err.message);
				res.status(500).json('Server Error');
			}
		}
	}
}