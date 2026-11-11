<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
const router = useRouter();

const salir = () => {
  auth.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <header class="navbar">
    <div>
      <strong>{{ auth.user?.nombre }}</strong>
      <span class="muted"> · {{ auth.rol }}</span>
    </div>
    <button class="btn btn-outline btn-sm" @click="salir">Cerrar sesión</button>
  </header>
</template>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; padding: .8rem 1.5rem;
  background: var(--card); border-bottom: 1px solid var(--border); }
</style>
