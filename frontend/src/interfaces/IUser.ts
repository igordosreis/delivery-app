export interface IUser {
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
