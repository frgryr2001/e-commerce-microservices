import { combineReducers } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";

import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import authReducer from "./authentication/authSlice";

const rootReducer = combineReducers({
  productModal: productModalReducer,
  cartItems: cartItemsReducer,
  user: authReducer,
});

export default rootReducer;
