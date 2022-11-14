import { combineReducers } from "@reduxjs/toolkit";

import productSlice from "./Products/productSlice";

const rootReducer = combineReducers({
  products: productSlice,
});

export default rootReducer;
