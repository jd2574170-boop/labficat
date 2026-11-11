import http from './http';

export const usuariosApi = {
  listar: () => http.get('/usuarios'),
  perfil: () => http.get('/usuarios/perfil'),
  cambiarEstado: (id, estado) => http.patch(`/usuarios/${id}/estado`, { estado }) // 1 | 0
};
