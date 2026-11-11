import http from './http';

export const muestrasApi = {
  listarTipos: () => http.get('/muestras/tipos'),
  crearTipo: (payload) => http.post('/muestras/tipos', payload),
  agregar: (payload) => http.post('/muestras', payload),
  porSolicitud: (solicitudId) => http.get(`/muestras/solicitud/${solicitudId}`)
};
