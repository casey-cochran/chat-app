import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import conversationReducer from './conversationSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
