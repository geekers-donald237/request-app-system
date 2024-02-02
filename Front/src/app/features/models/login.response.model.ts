import {IUser} from "./user.model";

export interface ILoginResponse {
  user: IUser;
  status: number;
  message: string;
  isLogged: boolean;
  token: string;
}
