import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
