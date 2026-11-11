<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { ROLES, STAFF } from '@/utils/constants';

const auth = useAuthStore();

// Un solo menú; cada ítem declara qué roles lo ven
const items = [
  { to: '/app', label: 'Inicio', roles: null },
  { to: '/app/mis-solicitudes', label: 'Mis solicitudes', roles: [ROLES.CLIENTE, ROLES.ADMIN] },
  { to: '/app/solicitudes/nueva', label: 'Nueva solicitud', roles: [ROLES.CLIENTE, ROLES.ADMIN] },
  { to: '/app/laboratorio/solicitudes', label: 'Gestión de solicitudes', roles: STAFF },
  { to: '/app/laboratorio/inconformidades', label: 'Inconformidades', roles: STAFF },
  { to: '/app/admin/usuarios', label: 'Usuarios', roles: [ROLES.ADMIN] },
  { to: '/app/admin/tipos-muestra', label: 'Tipos de muestra', roles: [ROLES.ADMIN] },
  { to: '/app/perfil', label: 'Mi perfil', roles: null }
];

const visible = computed(() => items.filter((i) => !i.roles || i.roles.includes(auth.rol)));
</script>

<template>
  <aside class="sidebar">
    <div class="logo">LIMS · SENA</div>
    <nav>
      <RouterLink v-for="i in visible" :key="i.to" :to="i.to" exact-active-class="active">{{ i.label }}</RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar { width: 240px; background: var(--secondary); color: #fff; padding: 1rem; flex-shrink: 0; }
.logo { font-weight: 700; font-size: 1.1rem; padding: .5rem .75rem 1.25rem; }
nav { display: flex; flex-direction: column; gap: .25rem; }
a { color: #cfe3f0; padding: .6rem .75rem; border-radius: 8px; font-size: .92rem; }
a:hover { background: rgba(255, 255, 255, .08); }
a.active { background: var(--primary); color: #fff; }
@media (max-width: 760px) { .sidebar { display: none; } }
</style>
