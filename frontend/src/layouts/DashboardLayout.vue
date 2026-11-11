<script setup>
import { RouterView } from 'vue-router';
import AppSidebar from '@/components/common/AppSidebar.vue';
import AppNavbar from '@/components/common/AppNavbar.vue';
import ToastContainer from '@/components/common/ToastContainer.vue';
</script>

<template>
  <div class="shell">
    <AppSidebar />
    <div class="main">
      <AppNavbar />
      <main class="content"><RouterView /></main>
    </div>
    <ToastContainer />
  </div>
</template>

<style scoped>
.shell { display: flex; min-height: 100vh; }
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.content { padding: 1.5rem; }
</style>
