import {HttpHeaders} from "@angular/common/http";

export const environment = {
  // baseUrl: 'https://easyrequest.akofena.digital/api/',
  // laravelBaseUrl: 'https://easyrequest.akofena.digital/storage/',
  baseUrl: 'http://127.0.0.1:8000/api',
  laravelBaseUrl: 'http://127.0.0.1:8000/storage/',
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
