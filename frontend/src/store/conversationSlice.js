import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

const initialState = {
  currentConversation: null,
  userConvos: [],
  status: null,
  error: null,
};

export const createConversation = createAsyncThunk(
  "conversations/createConversaion",
  async (data, { rejectWithValue }) => {
    try {
      const response = await csrfFetch("/conversation/new", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const newConvo = await response.json();
      if(newConvo.err){
       return rejectWithValue(newConvo)
      }
    } catch (e) {
      const error = await e.json();
      return rejectWithValue(error);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    loadConversations: (state, action) => {
      state.userConvos = action.payload;
    },
    addNewConversation: (state, action) => {
      state.userConvos.unshift(action.payload);
    },
  },
  extraReducers: {
    [createConversation.pending]: (state, action) => {
        state.status = 'loading';
    },
    [createConversation.fulfilled]: (state, action) => {
        state.status = 'success';
        state.userConvos.unshift(action.payload);
    },
    [createConversation.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
    }
  }
});

export const { setCurrentConversation, loadConversations, addNewConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
