import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store';

export const deliveryApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3071',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).reducer.authSlice.userData?.token;
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Products', 'Cart', 'Order'],
  endpoints: (builder) => ({}),
});
