import {IUserRole} from "./user.role.model";

export interface IUser {
  id: number;
  name: string;
  email: string;
  rules: IUserRole[];
  email_verified_at: string;
  is_deleted: number;
  created_at: string;
}
export interface IUserResponse {
  status: number;
  user: IUser[];
}
