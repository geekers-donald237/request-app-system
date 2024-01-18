export interface IStudentData {
  matricule: string;
  nom: string;
  email: string;
}

export interface IStudentResponse {
  status: number;
  data: IStudentData;
  message: string;
}
