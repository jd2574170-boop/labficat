<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { solicitudesApi } from '@/api/solicitudes.api';
import { ESTADOS_SOLICITUD } from '@/utils/constants';
import { formatDate } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';
import LoadingState from '@/components/common/LoadingState.vue';

const solicitudes = ref([]);
const loading = ref(true);
const filtro = ref('');
const busqueda = ref('');

const filtradas = computed(() =>
  solicitudes.value.filter((s) =>
    (!filtro.value || s.estado === filtro.value) &&
    (!busqueda.value || `${s.numero_radicado} ${s.cliente_nombre}`.toLowerCase().includes(busqueda.value.toLowerCase()))
  )
);

onMounted(async () => {
  try { solicitudes.value = (await solicitudesApi.listarTodas()).data; } finally { loading.value = false; }
});
</script>

<template>
  <div class="page-header">
    <h1>Gestión de solicitudes</h1>
    <div style="display:flex; gap:.5rem">
      <input v-model="busqueda" placeholder="Buscar radicado o cliente…" />
      <select v-model="filtro">
        <option value="">Todos los estados</option>
        <option v-for="e in ESTADOS_SOLICITUD" :key="e">{{ e }}</option>
      </select>
    </div>
  </div>

  <div class="card">
    <LoadingState :loading="loading" :empty="!filtradas.length">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Radicado</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in filtradas" :key="s.idsolicitud">
              <td><strong>{{ s.numero_radicado }}</strong></td>
              <td>{{ s.cliente_nombre }}<div class="muted">{{ s.cliente_correo }}</div></td>
              <td>{{ formatDate(s.fecha_solicitud) }}</td>
              <td><StatusBadge :status="s.estado" /></td>
              <td><RouterLink :to="`/app/solicitudes/${s.idsolicitud}`">Gestionar</RouterLink></td>
            </tr>
          </tbody>
        </table>
      </div>
    </LoadingState>
  </div>
</template>
