import http from './http';

export const authApi = {
  login: (payload) => http.post('/auth/login', payload),
  register: (payload) => http.post('/auth/register', payload),
  perfil: () => http.get('/usuarios/perfil')
};
