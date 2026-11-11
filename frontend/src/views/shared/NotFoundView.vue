<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div class="empty" style="padding-top: 20vh">
    <h1>404</h1><p>La página que buscas no existe.</p>
    <RouterLink to="/app" class="btn" style="margin-top: 1rem">Volver al inicio</RouterLink>
  </div>
</template>
