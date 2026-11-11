<script setup>
defineProps({ loading: Boolean, empty: Boolean, emptyText: { type: String, default: 'No hay información para mostrar.' } });
</script>

<template>
  <div v-if="loading" class="empty">Cargando…</div>
  <div v-else-if="empty" class="empty">{{ emptyText }}</div>
  <slot v-else />
</template>
