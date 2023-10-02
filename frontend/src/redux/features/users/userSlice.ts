import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/interfaces/IUser';

interface UserState {
  userData: IUser | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.userData = action.payload.userData;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
