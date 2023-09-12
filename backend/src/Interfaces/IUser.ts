export interface IUser {
  id: number | string;
  userName: string;
  role: string;
  email: string;
}

export interface IUserDb extends IUser {
  password: string;
}

export interface IUserLogged extends IUser {
  token: string;
}

export type IUserLogin = Omit<IUserDb, 'id' | 'userName' | 'role'>;

// export interface IUserLogin extends Omit<IUserDb, 'id' | 'userName' | 'role'> {}

// export interface IUserLogin {
//   email: string;
//   password: string;
// }

export type IUserRegister = Omit<IUserDb, 'id' | 'role'>;

export type IUserCreate = Omit<IUserDb, 'id'>;

// export interface IUserLogin extends Omit<IUserDb, 'id' | 'role'> {}

// export interface IUserNew {
//   userName: string;
//   email: string;
//   password: string;
// }
