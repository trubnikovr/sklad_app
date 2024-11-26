import axios from 'axios';
import { useAuthStore } from "../../stores/AuthState.ts";


const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавим interceptor для автоматической подстановки токена
api.interceptors.request.use((config) => {

  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
