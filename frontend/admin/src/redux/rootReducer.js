import { combineReducers } from "@reduxjs/toolkit";

import productSlice from "./Products/productSlice";
import categorySlice from "./Category/categorySlice";
import voucherSlice from "./Voucher/voucherSlice";
import authSlice from "./Auth/authSlice";
const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,
  voucher: voucherSlice,
  auth: authSlice,
});

export default rootReducer;
