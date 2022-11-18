import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// authentication initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// login thunk
export const fetchLogin = createAsyncThunk(
  "authentication/fetchLogin",
  async ({ data, toast, history }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH_URL}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Login success");
      history.push("/");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);
// register thunk
export const fetchRegister = createAsyncThunk(
  "authentication/fetchRegister",
  async ({ data, toast, form }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH_URL}/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Đăng kí thành công");
      form.resetFields();
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);
// logout thunk
export const fetchLogout = createAsyncThunk(
  "authentication/fetchLogout",
  async ({ axiosJWT, token, history }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get(
        `${process.env.REACT_APP_API_AUTH_URL}/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      history.push("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// forgot password thunk
export const fetchForgotPassword = createAsyncThunk(
  "authentication/fetchForgotPassword",
  async ({ data, form, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_AUTH_URL}/forgotPassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Đã gửi email thành công");
      form.resetFields();
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

// reset password thunk
export const fetchResetPassword = createAsyncThunk(
  "authentication/fetchResetPassword",
  async ({ data, token, toast, history }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_AUTH_URL}/resetPassword/${token}`,
        { password: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Đổi mật khẩu thành công");
      history.push("/login");
      return response.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

// authentication slice
export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      // state.error = null;
    },

    // logoutUser: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.token = null;
    // },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.error = null;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [fetchLogout.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLogout.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    [fetchLogout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
