import http from './http';

export const solicitudesApi = {
  crear: (payload) => http.post('/solicitudes', payload),
  misSolicitudes: () => http.get('/solicitudes/mis-solicitudes'),
  listarTodas: () => http.get('/solicitudes'),
  obtener: (id) => http.get(`/solicitudes/${id}`),
  cambiarEstado: (id, estado) => http.patch(`/solicitudes/${id}/estado`, { estado })
};
