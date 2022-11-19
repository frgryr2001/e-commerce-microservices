import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../shopping-cart/cartItemsSlide";
import { resetVoucher } from "../Voucher/voucherSlice";

// create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ order, token, toast, dispatch }, { rejectWithValue }) => {
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
      //   setTimeout(() => {
      //     history.push("/cart");
      //   }, 1500);

      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);

      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  order: {},
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

      state.order = action.payload.order;
    },
    [createOrder.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
