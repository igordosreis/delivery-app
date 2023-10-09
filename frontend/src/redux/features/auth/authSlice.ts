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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload;
      }
    );
  },
});

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) =>
  state.reducer.authSlice.userData;
