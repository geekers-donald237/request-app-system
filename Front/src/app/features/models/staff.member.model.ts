export interface IStaffMember {
  id: number;
  name: string;
  email: string;
  job_title: string;
  address: string;
  staff_id: number;
}
export interface IGetStaffResponse {
  status: number;
  staff: IStaffMember[];
}
