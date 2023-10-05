import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { deliveryApi } from '@/redux/api/apiSlice';
import { IUser } from '@/interfaces/IUser';
import { PATH_LOGIN } from '@/constants';
import { extendedApiSlice } from '@/redux/api/services/userSlice';
import { RootState } from '@/redux/store';

interface UserState {
  userData: IUser | null;
}

const initialState: UserState = {
  userData: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload;
      }
    );
  },
});

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.authSlice.userData;
