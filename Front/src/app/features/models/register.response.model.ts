import {IUser} from "./user.model";

export interface IRegisterResponse {
  status: number;
  message: string;
  isRegistered: boolean;
}
