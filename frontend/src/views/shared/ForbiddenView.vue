<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="empty" style="padding-top: 20vh">
    <h1>403</h1><p>No tienes permisos para acceder a esta sección.</p>
    <RouterLink to="/app" class="btn" style="margin-top: 1rem">Volver al inicio</RouterLink>
  </div>
</template>
