import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";

const initialState = {
    currentConversation: null,
    userConvos: [],
}

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
        }
    }
})

export const {setCurrentConversation, loadConversations, addNewConversation} = conversationSlice.actions;
export default conversationSlice.reducer;
