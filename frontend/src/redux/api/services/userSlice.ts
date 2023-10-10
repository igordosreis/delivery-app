import { deliveryApi } from '@/redux/api/apiSlice';
import { IUser, IUserLogin } from '@/interfaces/IUser';
import { PATH_LOGIN } from '@/constants';

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
  }),
});

export const { useLoginUserMutation } = userApiSlice;
