import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
  // CORRIGIDO: Deve ser a porta 3000
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;