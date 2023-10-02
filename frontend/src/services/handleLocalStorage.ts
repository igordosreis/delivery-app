import { IUser } from '@/interfaces/IUser';

import { LS_KEY_CART, LS_KEY_USER } from '../constants';

// User
export const saveUserDataOnLocalStorage = (data: IUser) => {
  localStorage.setItem(LS_KEY_USER, JSON.stringify(data));
};

export const getUserDataOnLocalStorage = () => {
  const retrivedUser = localStorage.getItem(LS_KEY_USER);
  if (retrivedUser) {
    return JSON.parse(retrivedUser) || {};
  }
  return {};
};

export const deleteUserDataOnLocalStorage = () => {
  localStorage.removeItem(LS_KEY_USER);
};

// Cart
// export const saveCartOnLocalStorage = (data) => {
//   localStorage.setItem(LS_KEY_CART, JSON.stringify(data));
// };

// export const getCartOnLocalStorage = () =>
//   JSON.parse(localStorage.getItem(LS_KEY_CART)) || {};

// export const deleteCartOnLocalStorage = () => {
//   localStorage.removeItem(LS_KEY_CART);
// };
