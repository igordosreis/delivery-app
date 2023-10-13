import { deliveryApi } from '@/redux/api/apiSlice';
import { IUser, IUserLogin, IUserSeller } from '@/interfaces/IUser';
import { PATH_CUSTOMER, PATH_LOGIN, PATH_SELLER } from '@/constants';

export const userApiSlice = deliveryApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, IUserLogin>({
      query: (userData) => ({
        url: `/${PATH_LOGIN}`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getSellers: builder.query<IUserSeller[], void>({
      query: () => ({
        url: `/${PATH_CUSTOMER}/${PATH_SELLER}`,
      }),
      providesTags: ['Sellers'],
    }),
  }),
});

export const { useLoginUserMutation, useGetSellersQuery } = userApiSlice;
