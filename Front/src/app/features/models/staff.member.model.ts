import {IUser} from "./user.model";

export interface IStaffMember {
  id: number;
  name: string;
  email: string;
  job_title: string;
  address: string;
  staff_id: number;
  user?: IUser | null;
}


