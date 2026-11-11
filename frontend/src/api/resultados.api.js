import http from './http';

export const resultadosApi = {
  // formData: archivo_resultado, observaciones, solicitudes_idsolicitud
  subir: (formData) => http.post('/resultados', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  porSolicitud: (solicitudId) => http.get(`/resultados/solicitud/${solicitudId}`)
};
