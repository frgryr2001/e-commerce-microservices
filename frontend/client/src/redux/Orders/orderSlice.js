import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../shopping-cart/cartItemsSlide";
import { resetVoucher } from "../Voucher/voucherSlice";

// create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ order, token, toast, dispatch, setCheck }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ORDER_URL}/create`,
        order,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order created successfully");
      dispatch(clearCart());
      dispatch(resetVoucher());
      setCheck(true);

      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);

      return rejectWithValue(err.response.data.message);
    }
  }
);
// get orders by user
export const getOrdersByUser = createAsyncThunk(
  "orders/getOrdersByUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ORDER_URL}/my-order`,
        {
          headers: {
            "Content-Type": "application/json",
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
export const updateOrderStatusUser = createAsyncThunk(
  "orders/updateOrderStatusUser",
  async ({ status, id_order, token, toast }, { rejectWithValue }) => {
    console.log(status, id_order, token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ORDER_URL}/change-status`,
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
  order: [],
  status: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.status = "loadding";
    },
    [createOrder.fulfilled]: (state, action) => {
      state.status = "succesed";
      // state.order = [...state.order, action.payload.order];
    },
    [createOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    [getOrdersByUser.pending]: (state) => {
      state.status = "loadding";
    },
    [getOrdersByUser.fulfilled]: (state, action) => {
      state.status = "succesed";
      state.order = action.payload.orders;
    },
    [getOrdersByUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    [updateOrderStatusUser.pending]: (state) => {
      state.status = "loadding";
    },
    [updateOrderStatusUser.fulfilled]: (state, action) => {
      state.status = "succesed";
      state.order = state.order.map((order) => {
        if (order._id === action.payload.order._id) {
          // change status
          order.status = action.payload.order.status;

          return order;
        }
        return order;
      });
    },
    [updateOrderStatusUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
