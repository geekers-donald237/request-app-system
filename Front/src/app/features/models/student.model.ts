export interface IStudent{
  matricule: string;
  nom: string;
  email: string;
}

export interface IStudentResponse {
  status: number;
  data: IStudent;
  message: string;
}
