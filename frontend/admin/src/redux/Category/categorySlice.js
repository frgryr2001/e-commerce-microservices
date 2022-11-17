import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PRODUCT_URL}/category`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ categoryName, form, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PRODUCT_URL}/category`,
        {
          name: categoryName,
        }
      );
      form.resetFields();
      toast.success("Tạo danh mục sản phẩm thành công");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryName, toast, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_PRODUCT_URL}/category/${id}`,
        {
          name: categoryName,
        }
      );

      toast.success("Cập nhật danh mục sản phẩm thành công");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_PRODUCT_URL}/category/${id}`
      );
      toast.success("Xóa danh mục sản phẩm thành công");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  categoryName: [],
  status: null,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.status = "success";
      state.categoryName = action.payload.categories;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [createCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.categoryName = [...state.categoryName, action.payload.category];
    },
    [createCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.categoryName = state.categoryName.map((category) =>
        category._id === action.payload.category._id
          ? action.payload.category
          : category
      );
    },
    [updateCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.categoryName = state.categoryName.filter(
        (category) => category._id !== action.payload.category._id
      );
    },
    [deleteCategory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default categorySlice.reducer;
