export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  id: number;
  userName: string;
  role: string;
  token?: string;
}
