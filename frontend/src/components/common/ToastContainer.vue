<script setup>
import { useUiStore } from '@/stores/ui.store';
const ui = useUiStore();
</script>

<template>
  <div class="toasts">
    <div v-for="t in ui.toasts" :key="t.id" class="toast" :class="t.type" @click="ui.dismiss(t.id)">
      {{ t.message }}
    </div>
  </div>
</template>

<style scoped>
.toasts { position: fixed; right: 1rem; bottom: 1rem; display: flex; flex-direction: column; gap: .5rem; z-index: 50; }
.toast { padding: .7rem 1rem; border-radius: 8px; color: #fff; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.18); }
.success { background: var(--primary-dark); }
.error { background: var(--danger); }
</style>
