import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ICart, IProductAction, IProductInputAction } from '@/interfaces/IProduct';

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
    removeProduct: (state, { payload }: PayloadAction<IProductAction>) => {
      const { id } = payload;
      const cartData: ICart = state.cartData;
      const cartItem = cartData[id];

      const isProductInCart = cartItem?.quantity;
      const newQuantity = isProductInCart ? cartItem.quantity - 1 : 0;

      const isProductStillInCart = newQuantity > 0;
      if (isProductStillInCart) {
        state.cartData = {
          ...cartData,
          [id]: {
            ...cartItem,
            quantity: newQuantity,
          },
        };
      } else {
        const { [id]: productRemovedFromCart, ...newState } = cartData;

        state.cartData = newState;
      }
    },
    inputQuantity: (state, { payload }: PayloadAction<IProductInputAction>) => {
      const { id, productname, price, value } = payload;
      const cartData: ICart = state.cartData;

      const isInputZero = value && +value === 0;
      const isInputEmpty = typeof value === 'string' && value.length === 0;
      if (isInputZero || isInputEmpty) {
        const { [id]: productRemovedFromCart, ...newState } = cartData;

        state.cartData = newState;
      } else {
        state.cartData = {
          ...cartData,
          [id]: {
            id,
            productname,
            price,
            quantity: +value,
          },
        };
      }
    },
    emptyCart: (state) => {
      state.cartData = {};
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, inputQuantity, emptyCart } =
  cartSlice.actions;
