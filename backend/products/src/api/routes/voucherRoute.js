const express = require("express");
const router = express.Router();

const {
  voucherValidator,
  updateVoucherValidator,
} = require("../validator/validator");

const voucherController = require("../controllers/voucherController");

router.get("/", voucherController.getAllVouchers);

router.get("/:code", voucherController.getVoucherByCode);

router.post("/", voucherValidator, voucherController.createVoucher);

router.put("/:id", updateVoucherValidator, voucherController.updateVoucher);

router.delete("/:id", voucherController.deleteVoucher);

module.exports = router;
