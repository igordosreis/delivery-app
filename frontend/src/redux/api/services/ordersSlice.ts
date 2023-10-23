import { deliveryApi } from '@/redux/api/apiSlice';
import {
  IOrder,
  IOrderId,
  IOrderRequest,
  IOrderStatusRequest,
  IOrderStatusResponse,
} from '@/interfaces/IOrders';
import { PATH_CHECKOUT, PATH_CUSTOMER, PATH_ORDERS, PATH_SELLER } from '@/constants';

export const ordersApiSlice = deliveryApi.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation<IOrderId, IOrderRequest>({
      query: (userData) => ({
        url: `/${PATH_CUSTOMER}/${PATH_CHECKOUT}`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: `/${PATH_ORDERS}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<IOrder, string>({
      query: (id) => ({
        url: `/${PATH_ORDERS}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
    patchOrderStatus: builder.mutation<IOrderStatusResponse, IOrderStatusRequest>({
      query: ({ orderId, status }) => ({
        url: `/${PATH_ORDERS}/${orderId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  usePostOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  usePatchOrderStatusMutation,
} = ordersApiSlice;
