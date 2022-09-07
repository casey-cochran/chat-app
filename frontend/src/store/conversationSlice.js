import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversation: null,
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addConversation: (state, action) => {
            state.conversation = action.payload;
        }
    }
})

export const {addConversation} = conversationSlice.actions;
export default conversationSlice.reducer;
