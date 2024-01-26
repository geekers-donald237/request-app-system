import {IAttachment} from "./student.request.model";

export interface ISender {
  id: number;
  user_id: number;
  matricule: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IPersonnalRequest {
  id: number;
  sender_id: number;
  request_pattern_id: number;
  title: string;
  content: string;
  statut: string;
  in_draft: number;
  is_deleted: number;
  handwritten_piece_present_disc: number;
  created_at: string;
  updated_at: string;
  attachments: IAttachment[];
  sender: ISender;
}

export interface IGetPersonnRequestsResponse {
  status: number;
  requests: IPersonnalRequest[];
  message: string;
}
