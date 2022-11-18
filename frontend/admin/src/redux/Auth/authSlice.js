import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login admin and employee
export const login = createAsyncThunk(
  "auth/login",
  async ({ data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH_URL}/login`,
        data
      );
      //   check role admin and employee
      if (
        response.data.data.role === "admin" ||
        response.data.data.role === "employee"
      ) {
        toast.success("Đăng nhập thành công");
        navigate("/");
        return response.data;
      } else {
        toast.error("Bạn không có quyền truy cập");
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ token, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_AUTH_URL}/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Đăng xuất thành công");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// logout admin and employee
const initialState = {
  token: "",
  status: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [logout.pending]: (state) => {
      state.status = "loading";
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = "";
    },
    [logout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
