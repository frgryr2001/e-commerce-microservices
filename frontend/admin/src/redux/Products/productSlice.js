import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// createProduct

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ product, form, toast }, { rejectWithValue }) => {
    try {
      const product_options = product.product_options;
      console.log("test", product);

      const formData = new FormData();
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i].originFileObj);
      }
      formData.append("price", product.price);
      formData.append("name", product.name);
      formData.append("category_id", product.category);
      formData.append("manufacture", product.manufacturer);
      formData.append("description", product.description);
      for (let i = 0; i < product_options.length; i++) {
        formData.append(`product_options[${i}][size]`, product_options[i].size);
        formData.append(
          `product_options[${i}][quantity]`,
          product_options[i].quantity
        );
        formData.append(
          `product_options[${i}][color]`,
          product_options[i].color
        );
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3002/api/products",
        formData,
        config
      );
      toast.success("Thêm sản phẩm thành công");
      form.resetFields();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:3002/api/products");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  status: null,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [createProduct.fulfilled]: (state, action) => {
      console.log("213123", action.payload);
      console.log("2131222223", state);

      state.status = "success";
      // state.products = [...state.products, action.payload.product];
    },
    [createProduct.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getAllProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
