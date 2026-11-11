<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { solicitudesApi } from '@/api/solicitudes.api';
import { formatDate } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';
import LoadingState from '@/components/common/LoadingState.vue';

const solicitudes = ref([]);
const loading = ref(true);

onMounted(async () => {
  try { solicitudes.value = (await solicitudesApi.misSolicitudes()).data; } finally { loading.value = false; }
});
</script>

<template>
  <div class="page-header">
    <h1>Mis solicitudes</h1>
    <RouterLink to="/app/solicitudes/nueva" class="btn">Nueva solicitud</RouterLink>
  </div>

  <div class="card">
    <LoadingState :loading="loading" :empty="!solicitudes.length" empty-text="Aún no has creado solicitudes.">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Radicado</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in solicitudes" :key="s.idsolicitud">
              <td><strong>{{ s.numero_radicado }}</strong></td>
              <td>{{ formatDate(s.fecha_solicitud) }}</td>
              <td><StatusBadge :status="s.estado" /></td>
              <td><RouterLink :to="`/app/solicitudes/${s.idsolicitud}`">Ver detalle</RouterLink></td>
            </tr>
          </tbody>
        </table>
      </div>
    </LoadingState>
  </div>
</template>
