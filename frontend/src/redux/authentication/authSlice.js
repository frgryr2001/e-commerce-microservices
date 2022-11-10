import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// authentication initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// login thunk
export const login = createAsyncThunk(
  "authentication/login",
  async ({ data, axiosJWT }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(
        "localhost:3000/v1/api/auth/login",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// register thunk
export const register = createAsyncThunk(
  "authentication/register",
  async ({ data, axiosJWT }, { rejectWithValue }) => {
    try {
      const response = await axiosJWT.post(
        "localhost:3000/v1/api/auth/register",
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// logout thunk
export const logout = createAsyncThunk(
  "authentication/logout",
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
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [register.pending]: (state) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [register.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
