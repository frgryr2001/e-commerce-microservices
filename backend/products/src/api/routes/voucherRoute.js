const express = require("express");
const router = express.Router();

const {
  voucherValidator,
  updateVoucherValidator,
} = require("../validator/validator");
const isAuthenticated = require("../middlewares/isAuthenticated");
 
const voucherController = require("../controllers/voucherController");

router.get("/", voucherController.getAllVouchers);

router.get("/:code", voucherController.getVoucherByCode);

router.post("/",isAuthenticated, voucherValidator, voucherController.createVoucher);

router.put("/:id",isAuthenticated, updateVoucherValidator, voucherController.updateVoucher);

router.delete("/:id",isAuthenticated, voucherController.deleteVoucher);

router.get("/use/:id", voucherController.useVoucher);

module.exports = router;
