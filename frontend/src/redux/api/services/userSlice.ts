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
        method: 'GET',
      }),
      providesTags: ['Sellers'],
    }),
    registerNewUser: builder.mutation<IUser, IUserRegister>({
      query: (newUserData) => ({
        url: `/${PATH_REGISTER}`,
        method: 'POST',
        body: newUserData,
      }),
    }),
    createNewUser: builder.mutation<void, IUserCreate>({
      query: (newUserData) => ({
        url: `/${PATH_ADMIN}`,
        method: 'POST',
        body: newUserData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${PATH_ADMIN}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getAllUsers: builder.query<Omit<IUser, 'password'>[], void>({
      query: () => ({
        url: `/${PATH_ADMIN}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetSellersQuery,
  useRegisterNewUserMutation,
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} = userApiSlice;
