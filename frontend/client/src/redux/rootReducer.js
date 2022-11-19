import { combineReducers } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";

import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import authReducer from "./authentication/authSlice";
import productReducer from "./products/productSlice";
import categoriesReducer from "./Categories/CategorySlice";
import voucherReducer from "./Voucher/voucherSlice";
import orderReducer from "./Orders/orderSlice";
const rootReducer = combineReducers({
  productModal: productModalReducer,
  cartItems: cartItemsReducer,
  user: authReducer,
  products: productReducer,
  categories: categoriesReducer,
  voucher: voucherReducer,
  orders: orderReducer,
});

export default rootReducer;
