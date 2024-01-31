import {IUe} from "./ue.model";

export interface IUesWithDeadlinesResponse {
  status: number;
  ues: IUe[];
  message: string;
}
