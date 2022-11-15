import { combineReducers } from "@reduxjs/toolkit";

import productSlice from "./Products/productSlice";
import categorySlice from "./Category/categorySlice";
const rootReducer = combineReducers({
  products: productSlice,
  categories: categorySlice,
});

export default rootReducer;
