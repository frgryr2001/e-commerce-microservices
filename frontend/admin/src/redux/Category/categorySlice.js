import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3002/api/category");
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
      state.categoryName = action.payload;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default categorySlice.reducer;
