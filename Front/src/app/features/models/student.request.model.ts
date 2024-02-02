import {IRequest} from "./request.model";


export interface IReceiver {
  id: number;
  user_id: number;
  job_title: string;
  phone_number: string;
  address: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IGetStudentRequestResponse {
  status: number;
  requests: IRequest[];
  message: string;
}
