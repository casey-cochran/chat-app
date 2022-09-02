import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

const initialState = {
  user: null,
  status: null,
  error: null,
};

export const logInUser = createAsyncThunk(
  'users/logInUser',
  async(user) => {
    try{
    const response = await csrfFetch("/user/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
  }catch(e){
    const err = await e.json();
    return err;
  }
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
  extraReducers:{
    [logInUser.pending]: (state,action) => {
      state.status = 'loading'
  },
    [logInUser.fulfilled]: (state,action) => {
      state.status = 'success';
      state.user = action.payload;
  },
    [logInUser.rejected]: (state,action) => {
      state.status = 'failed';
      state.error = action.error
  }
  }
});

export const {addUser, logout} = userSlice.actions;
export default userSlice.reducer;
