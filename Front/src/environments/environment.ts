export const environment = {
  baseUrl: 'http://localhost:8000/api',
  token: localStorage.getItem('token'),
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};
