import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { ROLES, STAFF } from '@/utils/constants';

const routes = [
  // ---------- Públicas ----------
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', name: 'login', component: () => import('@/views/auth/LoginView.vue') },
      { path: 'registro', name: 'registro', component: () => import('@/views/auth/RegisterView.vue') }
    ]
  },

  // ---------- Privadas (layout con sidebar) ----------
  {
    path: '/app',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/shared/DashboardView.vue') },
      { path: 'perfil', name: 'perfil', component: () => import('@/views/shared/PerfilView.vue') },

      // Cliente
      {
        path: 'mis-solicitudes',
        name: 'mis-solicitudes',
        component: () => import('@/views/cliente/MisSolicitudesView.vue'),
        meta: { roles: [ROLES.CLIENTE, ROLES.ADMIN] }
      },
      {
        path: 'solicitudes/nueva',
        name: 'solicitud-nueva',
        component: () => import('@/views/cliente/NuevaSolicitudView.vue'),
        meta: { roles: [ROLES.CLIENTE, ROLES.ADMIN] }
      },
      {
        // Detalle: cliente (propias) y staff (todas). El backend valida la propiedad.
        path: 'solicitudes/:id',
        name: 'solicitud-detalle',
        component: () => import('@/views/cliente/SolicitudDetalleView.vue'),
        props: true
      },

      // Laboratorio (Administrador / Personal)
      {
        path: 'laboratorio/solicitudes',
        name: 'lab-solicitudes',
        component: () => import('@/views/laboratorio/SolicitudesView.vue'),
        meta: { roles: STAFF }
      },
      {
        path: 'laboratorio/inconformidades',
        name: 'lab-inconformidades',
        component: () => import('@/views/laboratorio/InconformidadesView.vue'),
        meta: { roles: STAFF }
      },

      // Administración
      {
        path: 'admin/usuarios',
        name: 'admin-usuarios',
        component: () => import('@/views/admin/UsuariosView.vue'),
        meta: { roles: [ROLES.ADMIN] }
      },
      {
        path: 'admin/tipos-muestra',
        name: 'admin-tipos-muestra',
        component: () => import('@/views/admin/TiposMuestraView.vue'),
        meta: { roles: [ROLES.ADMIN] }
      }
    ]
  },

  { path: '/403', name: 'forbidden', component: () => import('@/views/shared/ForbiddenView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/shared/NotFoundView.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.matched.some((r) => r.meta.requiresAuth) && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.matched.some((r) => r.meta.guestOnly) && auth.isAuthenticated) {
    return { name: 'dashboard' };
  }
  const allowed = to.matched.flatMap((r) => r.meta.roles || []);
  if (allowed.length && !allowed.includes(auth.rol)) {
    return { name: 'forbidden' };
  }
});

export default router;
