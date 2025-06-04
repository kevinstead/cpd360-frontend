import axios from 'axios';

const api = axios.create({
  baseURL: "https://cpd360-backend-production.up.railway.app",
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_BASE_URL = 'https://cpd360-backend-production.up.railway.app';

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export default api;
