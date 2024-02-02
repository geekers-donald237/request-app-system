import {IReceiver} from "./student.request.model";
import {ISender} from "./sender.request.model";
import {IAttachment} from "./file.attachement.model";


export interface IRequest {
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
  attachements: IAttachment[]
  receivers: IReceiver[];
  sender: ISender[];
}

export interface IRequestResponse {
  message: string;
  request: IRequest;
  statut: number;
}


