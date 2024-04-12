import {HttpHeaders} from "@angular/common/http";

export const environment = {
  baseUrl: 'http://192.168.122.101:8000/api',
  laravelBaseUrl: 'http://192.168.122.101:8000/storage',
  headers : new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
