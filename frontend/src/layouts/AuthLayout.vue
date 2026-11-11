<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="auth-shell">
    <div class="auth-card card">
      <div class="brand">
        <h1>LIMS Nutricional</h1>
        <p class="muted">Plataforma de gestión de análisis nutricionales · SENA</p>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.auth-shell { min-height: 100vh; display: grid; place-items: center; padding: 1rem;
  background: linear-gradient(135deg, var(--secondary), var(--primary)); }
.auth-card { width: 100%; max-width: 420px; padding: 2rem; }
.brand { text-align: center; margin-bottom: 1.5rem; }
</style>
