import {IDepartment} from "./department.model";
import {ILevel} from "./level.model";
import {IUe} from "./ue.model";
import {IStaffMember} from "./staff.member.model";

export interface IStudentInfo {
  department: IDepartment;
  level: ILevel;
  ue: IUe[];
  staff: IStaffMember;
}

export interface IStudentInfoResponse {
  status: string;
  data: IStudentInfo;
  message: string;
}
