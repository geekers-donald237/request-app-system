export interface IStaffMember {
  id: number;
  name: string;
  email: string;
  job_title: string;
  address: string;
  staff_id: number;
  user?: IUser | null;
}

// export interface IUser {
//   id: number;
//   name: string;
// }

// user.model.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
  rules : any[];
}

export interface IGetStaffResponse {
  status: number;
  staff: IStaffMember[];
}

export interface IUserResponse {
  status: number;
  user: IUser[];
}
