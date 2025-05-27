import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import bookReducer from './features/bookSlice';
import reviewReducer from './features/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});