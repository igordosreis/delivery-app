import { deliveryApi } from '@/redux/api/apiSlice';
import { IOrder, IOrderId, IOrderRequest } from '@/interfaces/IOrders';
import { PATH_CHECKOUT, PATH_CUSTOMER, PATH_ORDERS, PATH_SELLER } from '@/constants';

export const ordersApiSlice = deliveryApi.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation<IOrderId, IOrderRequest>({
      query: (userData) => ({
        url: `/${PATH_CUSTOMER}/${PATH_CHECKOUT}`,
        method: 'POST',
        body: userData,
      }),
    }),
    getOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `/${PATH_ORDERS}`,
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const { usePostOrderMutation, useGetOrdersQuery } = ordersApiSlice;
