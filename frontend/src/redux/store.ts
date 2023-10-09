import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { deliveryApi } from '@/redux/api/apiSlice';
import authReducer from '@/redux/features/auth/authSlice';
import cartReducer from '@/redux/features/cart/cartSlice';

const rootReducer = combineReducers({
  authSlice: authReducer,
  cartSlice: cartReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'deliveryUser',
  storage,
};

const persistedReducer = persistReducer<RootReducer, AnyAction>(
  persistConfig,
  rootReducer
);

//To persist the state of only one reducer, use the commented config below:
// const persistedAuthReducer = persistReducer<RootReducer, AnyAction>(
//   persistConfig,
//   authReducer,
// );

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
    //autoSlice: persistedAuthReducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(deliveryApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
