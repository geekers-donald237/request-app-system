import {IAttachment} from "./student.request.model";

export interface IRequestDetailsResponse {
  message: string;
  request: IRequestDetails;
  statut: number;
}

export interface IRequestDetails {
  id: number;
  content: string;
  created_at: string;
  handwritten_piece_present_disc: number;
  in_draft: number;
  is_deleted: number;
  request_pattern_id: number;
  sender_id: number;
  statut: string;
  title: string;
  updated_at: string;
  attachements : IAttachment[]
}
