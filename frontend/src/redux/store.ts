import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

import { deliveryApi } from './api/apiSlice';
import authReducer from './features/auth/authSlice';

const rootReducer = combineReducers({
  authSlice: authReducer,
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

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
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
