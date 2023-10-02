import axios from 'axios';

import { IUser, IUserLogin } from '@/interfaces/IUser';

import { PATH_LOGIN, URL_BASE } from '../constants';

const postLogin = async (request: IUserLogin) => {
  const loginUrl = `${URL_BASE}/${PATH_LOGIN}`;
  try {
    const { data, status } = await axios.post<IUser>(loginUrl, request);
    return { userData: data, status };
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   error.
    //   const { response: { status } } = error;
    //   // return response;
    //   console.log('response: ', response);
    // }
    if (axios.isAxiosError<{ error: { data: { message: string } } }>(error)) {
      // const { response } = error;
      // console.log('response: ', response?.status);
      return {
        userData: { userName: '', email: '', role: '', token: '' },
        status: 401,
      };
    }
    // } catch ({ response: { data, status } }) {
    throw new Error('error msg');
    // return { error };
    // return { data: data.message, status };
  }
};

export default postLogin;
