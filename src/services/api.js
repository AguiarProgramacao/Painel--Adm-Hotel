import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware para autenticação (caso necessário)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Armazene o token após login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
