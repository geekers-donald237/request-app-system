import {IStaffMember} from "./staff.member.model";

export interface IDepartment {
  id: number;
  faculty_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ILevel {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}


// course.interface.ts
export interface ICourse {
  id: number;
  level_id: number;
  department_id: number;
  staff_id: number;
  code_ue: string;
  libelle: string;
  created_at: string;
  updated_at: string;
  staff: IStaffMember;
}

export interface IStudentSchoolData {
  department: IDepartment;
  level: ILevel;
  courses: ICourse[];
}


export interface IStudentSchoolDataResponse {
  status: string;
  data: IStudentSchoolData;
  message: string;
}
