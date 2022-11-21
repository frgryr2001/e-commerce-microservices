import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create voucher
export const createVoucher = createAsyncThunk(
  "voucher/createVoucher",
  async ({ data, form, toast, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PRODUCT_URL}/voucher`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Tạo voucher thành công");
      form.resetFields();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// get all vouchers
export const getAllVouchers = createAsyncThunk(
  "voucher/getAllVouchers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_PRODUCT_URL}/voucher`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// update voucher
export const updateVoucher = createAsyncThunk(
  "voucher/updateVoucher",
  async ({ data, toast, id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_PRODUCT_URL}/voucher/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cập nhật voucher thành công");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);

      return rejectWithValue(err.response.data.message);
    }
  }
);

// delete voucher
export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async ({ id, toast, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_PRODUCT_URL}/voucher/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Xóa voucher thành công");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  voucher: [],
  status: "idle",
  error: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {},
  extraReducers: {
    [createVoucher.pending]: (state, action) => {
      state.status = "loading";
    },
    [createVoucher.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.voucher = [...state.voucher, action.payload.voucher];
    },
    [createVoucher.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getAllVouchers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllVouchers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.voucher = action.payload.vouchers;
    },
    [getAllVouchers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateVoucher.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateVoucher.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.voucher = state.voucher.map((voucher) =>
        voucher._id === action.payload.voucher._id
          ? action.payload.voucher
          : voucher
      );
    },
    [updateVoucher.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    [deleteVoucher.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteVoucher.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.voucher = state.voucher.filter(
        (voucher) => voucher._id !== action.payload.id
      );
    },
    [deleteVoucher.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default voucherSlice.reducer;
