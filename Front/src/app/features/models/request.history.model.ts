export interface IRequestHistory {
  id: number;
  request_id: number;
  modify_by: string;
  status: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IRequestHistoryResponse {
  status: number;
  message: string;
  history: IRequestHistory[];
}
