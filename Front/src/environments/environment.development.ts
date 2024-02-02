import {HttpHeaders} from "@angular/common/http";

export const environment = {
  baseUrl: 'http://192.99.168.190:8000/api',
  token: localStorage.getItem('token'),

  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
