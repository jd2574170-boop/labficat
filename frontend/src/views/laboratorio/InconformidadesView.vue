<script setup>
import { ref, onMounted } from 'vue';
import { inconformidadesApi } from '@/api/inconformidades.api';
import LoadingState from '@/components/common/LoadingState.vue';

const items = ref([]);
const loading = ref(true);

onMounted(async () => {
  try { items.value = (await inconformidadesApi.listar()).data; } finally { loading.value = false; }
});
</script>

<template>
  <h1 class="page-header">Inconformidades</h1>
  <div class="card">
    <LoadingState :loading="loading" :empty="!items.length" empty-text="No hay inconformidades registradas.">
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Descripción</th><th>Solicitud</th></tr></thead>
          <tbody>
            <tr v-for="(i, idx) in items" :key="idx">
              <td>{{ i.idinconformidad ?? idx + 1 }}</td>
              <td>{{ i.descripcion_problema }}</td>
              <td>{{ i.solicitudes_idsolicitud }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </LoadingState>
  </div>
</template>
