import axios from 'axios';

const API_BASE_URL = 'https://perago-organization.hasura.app/api/rest'; // Update with your API endpoint

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-hasura-admin-secret': '12345',
  },
  
  
});

export default api;
