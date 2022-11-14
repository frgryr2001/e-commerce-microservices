import { combineReducers } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";

import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import authReducer from "./authentication/authSlice";
import productReducer from "./products/productSlice";

const rootReducer = combineReducers({
  productModal: productModalReducer,
  cartItems: cartItemsReducer,
  user: authReducer,
  products: productReducer,
});

export default rootReducer;
