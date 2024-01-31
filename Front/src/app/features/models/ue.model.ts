export interface IUe {
  id: number;
  level_id: number;
  department_id: number;
  staff_id: number;
  code_ue: string;
  libelle: string;
  is_deleted: number;
  publication_date: string | null;
  request_deadline: string | null;
  created_at: string;
  updated_at: string;
}
