import { defineStore } from 'pinia';
import { authApi } from '@/api/auth.api';
import { ROLES, STAFF } from '@/utils/constants';

// El backend devuelve formas distintas en login y register; se normaliza aquí
const normalizeUser = (u) => ({
  id: u.id ?? u.idusuarios,
  nombre: u.nombre,
  correo: u.correo,
  rol: u.rol ?? u.tipo_usuario
});

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null')
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    rol: (s) => s.user?.rol,
    isAdmin: (s) => s.user?.rol === ROLES.ADMIN,
    isStaff: (s) => STAFF.includes(s.user?.rol),
    isCliente: (s) => s.user?.rol === ROLES.CLIENTE
  },
  actions: {
    setSession({ user, token }) {
      this.token = token;
      this.user = normalizeUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    async login(credentials) {
      const res = await authApi.login(credentials);
      this.setSession(res.data);
    },
    async register(payload) {
      const res = await authApi.register(payload);
      this.setSession(res.data);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
