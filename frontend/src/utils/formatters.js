export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: '2-digit' }) : '—';

export const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value ?? 0);

// Los archivos subidos quedan en /uploads del backend
export const fileUrl = (path) => (path ? `/${String(path).replace(/\\/g, '/').replace(/^\/+/, '')}` : '#');
