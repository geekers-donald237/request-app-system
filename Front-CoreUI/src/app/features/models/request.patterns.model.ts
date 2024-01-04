export interface IRequestPattern {
  id: number;
  pattern_name: string;
  pattern_description: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IRequestPatternsResponse {
  status: number;
  patterns: IRequestPattern[];
}
