import http from './http';

export const inconformidadesApi = {
  registrar: (payload) => http.post('/inconformidades', payload), // { descripcion_problema, solicitudes_idsolicitud }
  listar: () => http.get('/inconformidades')
};
