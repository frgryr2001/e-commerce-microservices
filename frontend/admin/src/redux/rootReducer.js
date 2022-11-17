import { combineReducers } from "@reduxjs/toolkit";

import productSlice from "./Products/productSlice";
import categorySlice from "./Category/categorySlice";
import voucherSlice from "./Voucher/voucherSlice";
const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,
  voucher: voucherSlice,
});

export default rootReducer;
