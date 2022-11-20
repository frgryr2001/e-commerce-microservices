import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ORDER_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// update status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ status, id_order, token, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ORDER_URL}/orders/change-status`,
        { status: status * 1, id: id_order },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Đơn hàng đã được cập nhật");

      return response.data;
    } catch (err) {
      toast.error("Đơn hàng chưa được cập nhật");
      return rejectWithValue(err.response.data.message);
    }
  }
);
const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllOrders.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orders = action.payload.orders;
    },
    [fetchAllOrders.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [updateOrderStatus.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateOrderStatus.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orders = state.orders.map((order) =>
        order._id === action.payload.order._id ? action.payload.order : order
      );
    },
    [updateOrderStatus.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
