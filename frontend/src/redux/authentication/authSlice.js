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
        "http://localhost:3000/v1/api/auth/login",
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
      console.log(err.response.data.message);
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
        "http://localhost:3000/v1/api/auth/register",
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
  async ({ axiosJWT }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.get("localhost:3000/v1/api/auth/logout");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
