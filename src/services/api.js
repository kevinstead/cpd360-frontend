import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cpd360-backend.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
