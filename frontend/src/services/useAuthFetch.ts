// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import { executeLogout } from '@/utils';
// import {
//   UseQuery,
//   UseQueryHookResult,
// } from '@reduxjs/toolkit/dist/query/react/buildHooks';
// import { IProduct } from '@/interfaces/IProduct';

// interface HttpError {
//   status: number;
//   data: {
//     message: string;
//   };
// }

// const useAuthFetch = (fetchResult: any) => {
//   // const useAuthFetch = (fetchFn: Function, param: string | number) => {
//   const router = useRouter();
//   const [data, setData] = useState();
//   useEffect(() => {
//     if (fetchResult.isError) return '';
//     // try {
//     //   if (param) {
//     //     const result = fetchFn(param);
//     //     return setData(result);
//     //   } else {
//     //     const result = fetchFn();
//     //     return setData(result);
//     //   }
//     // } catch (error: unknown) {
//     //   const { status } = error as HttpError;
//     //   if (status === 401) return executeLogout(router);
//     // }
//   }, []);

//   return [data];
// };

// export default useAuthFetch;
