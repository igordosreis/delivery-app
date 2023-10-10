import { NextRouter } from 'next/router';

export const executeLogout = (router: NextRouter) => {
  // localStorage.removeItem('persist:deliveryUser');

  router.push('/login');
};
