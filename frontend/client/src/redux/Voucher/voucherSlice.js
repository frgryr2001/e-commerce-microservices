import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get voucher by code
export const getVoucherByCode = createAsyncThunk(
  "voucher/getVoucherByCode",
  async (code, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_PRODUCT_URL}/voucher/${code}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// voucher initial state
const initialState = {
  voucher: {},
  status: "idle",
  error: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {},
  extraReducers: {
    [getVoucherByCode.pending]: (state, action) => {
      state.status = "loading";
    },
    [getVoucherByCode.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.voucher = action.payload.voucher;
    },
    [getVoucherByCode.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default voucherSlice.reducer;
