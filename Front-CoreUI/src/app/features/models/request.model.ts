export interface IAttachment {
  id: number;
  request_id: number;
  file_path: string;
  is_handwritten: number;
  created_at: string;
  updated_at: string;
}

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

export interface IRequest {
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
  receivers: IReceiver[];
}

export interface IGetAllStudentRequestResponse {
  status: number;
  requests: IRequest[];
  message: string;
}
