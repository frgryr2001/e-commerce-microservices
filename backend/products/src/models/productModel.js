const removeVietnameseTones = require("../utils/removeVietnameseTones");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductOption = require("./product_optionModel");
const ProductImage = require("./productImageModel");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
      required: true,
      trim: true,
      trim: true,
    },
    images: {
      type: [ProductImage.schema],
      default: [],
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    category: {
      type: String,
    },
    manufacture: {
      type: String,
      trim: true,
      default: "",
    },
    slug: {
      type: String,
      trim: true,
      default: "",
    },
    sale_off_price: {
      type: Number,
      default: this.price,
    },
    product_options: {
      type: [ProductOption.schema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  this.slug =
    removeVietnameseTones(this.name) +
    `-${Math.floor(Date.now() + Math.random())}`;
  next();
});

module.exports = mongoose.model("Product", productSchema);
