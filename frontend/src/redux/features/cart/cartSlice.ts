import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { deliveryApi } from '@/redux/api/apiSlice';
import { userApiSlice } from '@/redux/api/services/userSlice';
import { RootState } from '@/redux/store';
import { ICart } from '@/interfaces/IProduct';

interface CartState {
  cartData: ICart | {};
}

const initialState: CartState = {
  cartData: {},
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProduct: (state, payload) => {
      if (payload) state.cartData = payload.payload.cartData;
    },
  },
});

export default cartSlice.reducer;
