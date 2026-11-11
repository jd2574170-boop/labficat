<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { solicitudesApi } from '@/api/solicitudes.api';
import { ESTADOS_SOLICITUD } from '@/utils/constants';

const auth = useAuthStore();
const conteo = ref({});
const total = ref(0);

onMounted(async () => {
  try {
    const res = auth.isStaff ? await solicitudesApi.listarTodas() : await solicitudesApi.misSolicitudes();
    total.value = res.data.length;
    conteo.value = res.data.reduce((acc, s) => ({ ...acc, [s.estado]: (acc[s.estado] || 0) + 1 }), {});
  } catch { /* el dashboard no debe romperse por esto */ }
});
</script>

<template>
  <div class="page-header">
    <div>
      <h1>Hola, {{ auth.user?.nombre }}</h1>
      <p class="muted">{{ auth.isStaff ? 'Resumen de solicitudes del laboratorio' : 'Resumen de tus solicitudes' }}</p>
    </div>
    <RouterLink v-if="!auth.isStaff || auth.isAdmin" to="/app/solicitudes/nueva" class="btn">Nueva solicitud</RouterLink>
  </div>

  <div class="grid grid-3">
    <div class="card"><div class="muted">Total</div><h1>{{ total }}</h1></div>
    <div v-for="e in ESTADOS_SOLICITUD" :key="e" class="card">
      <div class="muted">{{ e }}</div><h1>{{ conteo[e] || 0 }}</h1>
    </div>
  </div>
</template>
