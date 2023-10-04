import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { deliveryApi } from '@/redux/api/apiSlice';
import { IUser } from '@/interfaces/IUser';
import { PATH_LOGIN } from '@/constants';

interface UserState {
  userData: IUser | null;
}

const initialState: UserState = {
  userData: null,
};

// export const userSlice = createSlice({
//   name: 'userSlice',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<UserState>) => {
//       state.userData = action.payload.userData;
//     },
//     logout: () => initialState,
//   },
// });

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;

export const extendedApiSlice = deliveryApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: `/${PATH_LOGIN}`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginUserMutation } = extendedApiSlice;
