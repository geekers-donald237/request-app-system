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

export interface IUE {
  code_ue: string;
  created_at: string;
  department_id: number;
  id: number;
  is_deleted: number;
  level_id: number;
  libelle: string;
  pivot: {
    request_id: number;
    ue_id: number;
  };
  staff_id: number;
  updated_at: string;
}

export interface IRequest {
  id: number;
  request_code: string;
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
  ues: IUE[];
}

export interface IGetStudentRequestResponse {
  status: number;
  requests: IRequest[];
  message: string;
}
