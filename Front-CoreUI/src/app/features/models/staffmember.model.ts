export interface IStaffMember {
  id: number;
  name: string;
  email: string;
  job_title: string;
  address: string;
}
export interface IGetStaffResponse {
  status: number;
  staff: IStaffMember[];
}
