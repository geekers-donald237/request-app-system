export interface IUser {
  id: number;
  name: string;
  email: string;
  rules: IUserRole[];
  email_verified_at: string;
  is_deleted: number;
  created_at: string;
}

export interface IUserRole {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ILoginResponse {

  user: IUser;
  status: number;
  message: string;
  isLogged: boolean;
  token: string;
}
