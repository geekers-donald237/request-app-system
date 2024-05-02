import {HttpHeaders} from "@angular/common/http";

export const environment = {
  baseUrl: 'https://easyrequest.akofena.digital/api',
  laravelBaseUrl: 'https://easyrequest.akofena.digital/storage',
  headers : new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
