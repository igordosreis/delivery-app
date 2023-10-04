import { configureStore } from '@reduxjs/toolkit';

// import userReducer from './features/users/userSlice';
import { deliveryApi } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    // userState: userReducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deliveryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
