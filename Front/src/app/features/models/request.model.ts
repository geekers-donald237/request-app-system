import {IReceiver} from "./student.request.model";
import {ISender} from "./sender.request.model";
import {IAttachment} from "./file.attachement.model";
import {IUe} from "./ue.model";


export interface IRequest {
  id: number;
  content: string;
  created_at: string;
  request_code: string;
  handwritten_piece_present_disc: number;
  in_draft: number;
  is_deleted: number;
  request_pattern_id: number;
  sender_id: number;
  statut: string;
  title: string;
  updated_at: string;
  attachments: IAttachment[]
  receivers: IReceiver[];
  sender: ISender;
  ues : IUe[];
}

export interface IRequestResponse {
  message: string;
  requests: IRequest[];
  statut: number;
}


