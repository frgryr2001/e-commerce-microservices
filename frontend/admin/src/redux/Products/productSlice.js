import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// createProduct

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ product, form, toast }, { rejectWithValue }) => {
    try {
      const product_options = [
        {
          size: "32",
          color: "red",
          quantity: 10,
        },
      ];
      console.log("DI 21", product);
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
      state.status = "success";
      state.products.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
