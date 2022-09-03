import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

const initialState = {
  user: null,
  status: null,
  error: null,
};

export const logInUser = createAsyncThunk(
  "users/logInUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await csrfFetch("/user/login", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      const err = await e.json();
      return rejectWithValue(err);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async(user, {rejectWithValue}) => {
    try{
      const response = await csrfFetch("/user/signup", {
        method: "POST",
        body: JSON.stringify(user)
      })
      const data = await response.json();
      return data;
    }catch(e){
      const err = await e.json();
      return rejectWithValue(err);
    }
  })
)

export const restoreUser = createAsyncThunk(
  'user/restoreUser',
  async() => {
    const res = await csrfFetch('/user');
    const data = await res.json();
    return data;
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: {
    [logInUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [logInUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.user = action.payload;
    },
    [logInUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [signUpUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.user = action.payload;
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [restoreUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [restoreUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.error = null;
      state.user = action.payload;
    },
    [restoreUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer;
