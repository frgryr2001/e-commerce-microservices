import { combineReducers } from "@reduxjs/toolkit";

import productSlice from "./Products/productSlice";
import categorySlice from "./Category/categorySlice";
import voucherSlice from "./Voucher/voucherSlice";
import authSlice from "./Auth/authSlice";
import orderSlice from "./Orders/orderSlice";
import userSlice from "./User/userSlice";
const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,
  voucher: voucherSlice,
  auth: authSlice,
  orders: orderSlice,
  users: userSlice,
});

export default rootReducer;
