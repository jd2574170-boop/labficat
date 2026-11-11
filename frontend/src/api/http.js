import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000
});

// Adjunta el JWT en cada petición
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el token expira (401) se cierra la sesión
http.interceptors.response.use(
  (res) => res.data, // { success, message, data }
  (error) => {
    const status = error.response?.status;
    // El backend responde 401 (sin token) o 403 "Token inválido o expirado"
    const msg = error.response?.data?.message || '';
    const sesionInvalida = status === 401 || (status === 403 && /token/i.test(msg));
    if (sesionInvalida && !error.config.url.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const message = error.response?.data?.message || 'Error de conexión con el servidor';
    return Promise.reject({ status, message, errors: error.response?.data?.errors });
  }
);

export default http;
