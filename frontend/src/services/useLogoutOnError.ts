import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

import { useAppDispatch } from '@/redux/hooks';
import { logoutUser } from '@/redux/features/auth/authSlice';
import { PATH_LOGIN } from '@/constants';
import { deliveryApi } from '@/redux/api/apiSlice';

const useLogoutOnError = (
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (error && 'status' in error && !('error' in error)) {
      const errMsg = JSON.stringify(error.data);
      if (errMsg.toLowerCase().includes('token')) {
        dispatch(logoutUser());
        dispatch(deliveryApi.util.resetApiState());
        router.push(`/${PATH_LOGIN}`);
      }
    }
  }, [isError, error]);
};

export default useLogoutOnError;
