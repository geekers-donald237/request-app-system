export interface IStaffMember {
  id: number;
  name: string;
  email: string;
  job_title: string;
  address: string;
  staff_id: number;
  user?: IUser | null;
}

export interface IUser {
  id: number;
  name: string;
}
export interface IGetStaffResponse {
  status: number;
  staff: IStaffMember[];
}
