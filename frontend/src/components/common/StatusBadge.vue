<script setup>
import { computed } from 'vue';

const props = defineProps({ status: { type: String, required: true } });

const colors = {
  'Pendiente': '#e0a100', 'En revisión': '#2b7bd6', 'En proceso': '#7b5cd6',
  'Finalizada': '#39a900', 'Rechazada': '#d64545',
  'Pendiente de verificación': '#e0a100', 'Aprobado': '#39a900'
};
const color = computed(() => colors[props.status] || '#6b7785');
</script>

<template>
  <span class="badge" :style="{ background: color + '22', color }">{{ status }}</span>
</template>

<style scoped>
.badge { display: inline-block; padding: .2rem .6rem; border-radius: 999px; font-size: .78rem; font-weight: 600; white-space: nowrap; }
</style>
