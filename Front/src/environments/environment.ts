import {HttpHeaders} from "@angular/common/http";

const token = localStorage.getItem('token');

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8000/api',

  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }),
};
