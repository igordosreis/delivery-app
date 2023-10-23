import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '@/interfaces/IUser';
import { userApiSlice } from '@/redux/api/services/userSlice';
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
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload;
      }
    );
    builder.addMatcher(
      userApiSlice.endpoints.registerNewUser.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload;
      }
    );
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
export const selectCurrentUser = (state: RootState) =>
  state.reducer.authSlice.userData;
