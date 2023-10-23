export interface IUser {
  id: number | string;
  userName: string;
  email: string;
  role: string;
  token: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSeller {
  id: number;
  userName: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  userName: string;
}

export interface IUserCreate extends IUserRegister {
  role: string;
}
