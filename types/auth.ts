export interface FormRegister {
  fullname: string;
  email: string;
  password: string;
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
}

export type UserSession = Omit<User, "password">;
