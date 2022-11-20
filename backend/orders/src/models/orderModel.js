const mongoose = require("mongoose");
const { create } = require("../../../products/src/models/voucherModel");
const OrderDetail = require("./orderDetailModel");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    voucher_code: {
      type: String,
      default: "",
    },
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
    order_detail: {
      type: [OrderDetail.schema],
      ref: "OrderDetail",
      required: true,
    },
    province_id: {
      type: Number,
      required: true,
    },
    district_id: {
      type: Number,
      required: true,
    },
    ward_id: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      default: "",
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
  { strict: false }
);

module.exports = mongoose.model("Order", orderSchema);
