import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { deliveryApi } from '@/redux/api/apiSlice';
import { userApiSlice } from '@/redux/api/services/userSlice';
import { RootState } from '@/redux/store';
import { ICart, IProductAction, IProductInCart } from '@/interfaces/IProduct';

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
    addProduct: (state, { payload }: PayloadAction<IProductAction>) => {
      const { id, productname, price } = payload;
      const cartData = state.cartData as ICart;
      const cartItem = cartData[id];

      state.cartData = {
        ...cartData,
        [id]: {
          id,
          productname,
          price,
          quantity: (cartItem?.quantity || 0) + 1,
        },
      };
    },
  },
});

export default cartSlice.reducer;
export const { addProduct } = cartSlice.actions;
