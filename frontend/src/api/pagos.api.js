import http from './http';

export const pagosApi = {
  registrar: (payload) => http.post('/pagos', payload), // { monto, comprobante_url, solicitudes_idsolicitud }
  verificar: (id, estado_pago) => http.patch(`/pagos/${id}/verificar`, { estado_pago })
};
