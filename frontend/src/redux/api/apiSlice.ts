import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deliveryApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3071' }),
  tagTypes: ['User', 'Cart', 'Order'],
  endpoints: (builder) => ({}),
});
