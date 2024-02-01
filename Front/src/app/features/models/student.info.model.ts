import {IDepartment} from "./department.model";
import {ILevel} from "./level.model";
import {IUe} from "./ue.model";

export interface IStudentInfo {
  department: IDepartment;
  level: ILevel;
  courses: IUe[];
}

export interface IStudentInfoResponse {
  status: string;
  data: IStudentInfo;
  message: string;
}
