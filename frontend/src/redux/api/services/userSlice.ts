import { deliveryApi } from '@/redux/api/apiSlice';
import {
  IUser,
  IUserCreate,
  IUserLogin,
  IUserRegister,
  IUserSeller,
} from '@/interfaces/IUser';
import {
  PATH_ADMIN,
  PATH_CUSTOMER,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_SELLER,
} from '@/constants';

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
    registerNewUser: builder.query<IUser, IUserRegister>({
      query: (newUserData) => ({
        url: `/${PATH_REGISTER}`,
        method: 'POST',
        body: newUserData,
      }),
    }),
    createNewUser: builder.query<void, IUserCreate>({
      query: (newUserData) => ({
        url: `/${PATH_ADMIN}`,
        method: 'POST',
        body: newUserData,
      }),
    }),
    deleteUser: builder.query<void, string>({
      query: (id) => ({
        url: `/${PATH_ADMIN}/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllUsers: builder.query<Omit<IUser, 'password'>[], void>({
      query: () => ({
        url: `/${PATH_ADMIN}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetSellersQuery,
  useRegisterNewUserQuery,
  useCreateNewUserQuery,
  useDeleteUserQuery,
  useGetAllUsersQuery,
} = userApiSlice;
