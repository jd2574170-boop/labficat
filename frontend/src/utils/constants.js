export const ROLES = {
  ADMIN: 'Administrador',
  PERSONAL: 'Personal',
  CLIENTE: 'Cliente'
};

// Debe coincidir con solicitud.controller.js del backend
export const ESTADOS_SOLICITUD = ['Pendiente', 'En revisión', 'En proceso', 'Finalizada', 'Rechazada'];

// Debe coincidir con pago.controller.js
export const ESTADOS_PAGO = ['Pendiente de verificación', 'Aprobado', 'Rechazado'];

export const STAFF = [ROLES.ADMIN, ROLES.PERSONAL];
