const axios = require("axios");
const Product = require("../../models/productModel");
const ProductImage = require("../../models/productImageModel");
const ProductOption = require("../../models/product_optionModel");
const Category = require("../../models/categoryModel");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();
const FormData = require("form-data");
const { validationResult } = require("express-validator");

const IMGBB_API_KEY =
  process.env.IMGBB_API_KEY || "61a7cb2f7042d5741f20bc5142ce9791";
const IMGBB_EXPIRATION = process.env.IMGBB_EXPIRATION || 15552000;

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({ status: true }).populate(
        "category_id"
      );
      res.status(200).json({ status: "Thành công", products: products });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({
        status: "Thất bại",
        message: "Lấy danh sách sản phẩm thất bại",
      });
    }
  }

  //
  // @route   GET api/products/:id
  // @desc    Get product by id

  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(400).json({
          status: "Thất bại",
          message: "Không tìm thấy sản phẩm",
        });
      }
      res.status(200).json({ status: "Thành công", product: product });
    } catch (err) {
      console.error(err.message);
      res
        .status(400)
        .json({ status: "Thất bại", message: "Không tìm thấy sản phẩm" });
    }
  }

  async getProductOptions(req, res) {
    try {
      const product_option = await ProductOption.findById(req.params.id);
      res
        .status(200)
        .json({ status: "Thành công", product_option: product_option });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({
        status: "Thất bại",
        message: "Không tìm thấy kiểu sản phẩm",
      });
    }
  }
  //
  // @route   POST api/products
  // @desc    Create a product

  async createProduct(req, res) {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "Thất bại", message: errors.array()[0].msg });
    } else {
      let {
        name,
        description,
        price,
        category_id,
        category,
        product_options,
        manufacture,
        sale_off_price,
      } = JSON.parse(JSON.stringify(req.body));
      if (!sale_off_price) {
        sale_off_price = price;
      }
      try {
        let product = await Product.findOne({ name });
        if (product) {
          return res
            .status(400)
            .json({ status: "Thất bại", message: "Sản phẩm đã tồn tại" });
        }
        const images = [];
        const arr_product_options = [];
        product = await new Product({
          name,
          description,
          price,
          category_id,
          category,
          manufacture,
          product_options,
        });
        for (let i = 0; i < product_options.length; i++) {
          const productOption = await new ProductOption({
            product_id: product._id,
            size: product_options[i].size,
            quantity: product_options[i].quantity,
            color: product_options[i].color,
          });
          await arr_product_options.push(productOption);
        }
        console.log("Request Files", req.files);
        for (let i = 0; i < req.files.length; i++) {
          let formData = new FormData();
          formData.append("image", req.files[i].buffer.toString("base64"));
          await axios
            .post(
              `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}&expiration=${IMGBB_EXPIRATION}`,
              formData
            )
            .then(async (response) => {
              console.log("Images Res", response.data);
              const productImage = await new ProductImage({
                product_id: product._id,
                image_name: response.data.data.image.filename,
                image_url: response.data.data.url,
                delete_url: response.data.data.delete_url,
              });

              await images.push(productImage);
            })
            .catch((err) => {
              /* return res.status(400).json({
								message: 'Upload ảnh thất bại! Vui lòng thử lại',
								status: 'Thất bại',
								err: err,
							}); */
            });
        }
        console.log("2" + images);
        product.images = await images;
        product.product_options = await arr_product_options;
        await ProductOption.insertMany(arr_product_options);
        await ProductImage.insertMany(images);
        await product.save();

        return await res.status(200).json({
          status: "Thành công",
          message: "Thêm sản phẩm thành công",
          product: product,
        });
      } catch (error) {
        console.error(error.message);
        return res
          .status(400)
          .json({ status: "Thất bại", message: "Thêm sản phẩm thất bại!" });
      }
    }
  }

  async updateProduct(req, res) {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "Thất bại", message: errors.array()[0].msg });
    } else {
      let {
        name,
        description,
        price,
        category_id,
        category,
        product_options,
        manufacture,
        sale_off_price,
        product_images,
      } = JSON.parse(JSON.stringify(req.body));
      if (!sale_off_price) {
        sale_off_price = price;
      }
      try {
        let product = await Product.findById(req.params.id);
        if (!product) {
          return res
            .status(400)
            .json({ status: "Thất bại", message: "Sản phẩm không tồn tại" });
        }
        const images = product_images;
        const arr_product_options = [];
        product = await new Product({
          name,
          description,
          price,
          category_id,
          category,
          manufacture,
          product_options,
        });
        for (let i = 0; i < product_options.length; i++) {
          const productOption = await new ProductOption({
            product_id: product._id,
            size: product_options[i].size,
            quantity: product_options[i].quantity,
            color: product_options[i].color,
          });
          await arr_product_options.push(productOption);
        }
        for (let i = 0; i < req.files.length; i++) {
          let formData = new FormData();
          formData.append("image", req.files[i].buffer.toString("base64"));
          await axios
            .post(
              `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}&expiration=${IMGBB_EXPIRATION}`,
              formData
            )
            .then(async (response) => {
              const productImage = await new ProductImage({
                product_id: product._id,
                image_name: response.data.data.image.filename,
                image_url: response.data.data.url,
                delete_url: response.data.data.delete_url,
              });

              await images.push(productImage);
            })
            .catch((err) => {
              /* return res.status(400).json({
								message: 'Upload ảnh thất bại! Vui lòng thử lại',
								status: 'Thất bại',
								err:
							}); */
            });
        }
        product.images = await images;
        product.product_options = await arr_product_options;
        await ProductOption.insertMany(arr_product_options);
        await ProductImage.insertMany(images);

        await product.save();

        return await res.status(200).json({
          status: "Thành công",
          message: "Cập nhật sản phẩm thành công",
          product: product,
        });
      } catch (error) {
        console.error(error.message);
        return res.status(400).json({
          message: "Cập nhập sản phẩm không thành công!",
          status: "Thất bại",
        });
      }
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(400)
          .json({ status: "Thất bại", message: "Sản phẩm không tồn tại" });
      }
      const product_options = await ProductOption.find({
        product_id: req.params.id,
      });
      const product_images = await ProductImage.find({
        product_id: req.params.id,
      });
      for (let i = 0; i < product_options.length; i++) {
        await product_options[i].remove();
      }
      for (let i = 0; i < product_images.length; i++) {
        await axios
          .get(product_images[i].delete_url)
          .then(async (response) => {
            await product_images[i].remove();
          })
          .catch((err) => {});
      }
      await product.remove();
      return await res.status(200).json({
        id: req.params.id,
        status: "Thành công",
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        message: "Xóa sản phẩm không thành công",
        status: "Thất bại",
      });
    }
  }

  async hideProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(400)
          .json({ status: "Thất bại", message: "Sản phẩm không tồn tại" });
      }
      product.status = false;
      console.log(product);
      await product.save();
      return await res.status(200).json({
        product: product,
        id: req.params.id,
        status: "Thành công",
        message: "Ẩn sản phẩm thành công",
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        message: "Ẩn sản phẩm không thành công",
        status: "Thất bại",
      });
    }
  }

  async updateQuantity(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Thất bại, vui lòng kiểm tra lại",
        errors: errors.array()[0].msg,
      });
    } else {
      try {
        const { products, signal } = req.body;
        for (let i = 0; i < products.length; i++) {
          const product = await Product.findById(products[i].product_id);
          if (!product) {
            await session.abortTransaction();
            await session.endSession();
            return res
              .status(400)
              .json({ status: "Thất bại", message: "Sản phẩm không tồn tại" });
          }
          const product_option = await ProductOption.findById(
            products[i].product_option_id
          );
          if (!product_option) {
            return res
              .status(400)
              .json({ status: "Thất bại", message: "Sản phẩm không tồn tại" });
          }
          if (signal === 0) {
            if (product_option.quantity < products[i].quantity) {
              return res.status(400).json({
                status: "Thất bại",
                message: "Số lượng sản phẩm không đủ",
              });
            } else {
              product_option.quantity -= products[i].quantity;
              for (let j = 0; j < product.product_options.length; j++) {
                console.log(product.product_options[j]._id.toString());
                console.log(product_option._id.toString());
                if (
                  product.product_options[j]._id.toString() ===
                  product_option._id.toString()
                ) {
                  console.log("test");
                  product.product_options[j].quantity = product_option.quantity;
                }
              }
            }
          } else {
            product_option.quantity += products[i].quantity;
            for (let j = 0; j < product.product_options.length; j++) {
              if (
                product.product_options[j]._id.toString() ===
                product_option._id.toString()
              ) {
                product.product_options[j].quantity = product_option.quantity;
              }
            }
          }

          await product.save();
          await product_option.save();
        }
        return res.status(200).json({
          status: "Thành công",
          message: "Cập nhật số lượng sản phẩm thành công",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          status: "Thất bại",
          message: "Cập nhật số lượng sản phẩm không thành công!",
        });
      }
    }
  }
}

module.exports = new ProductController();
