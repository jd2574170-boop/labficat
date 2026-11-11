<script setup>
import { ref, reactive, onMounted } from 'vue';
import { muestrasApi } from '@/api/muestras.api';
import { useUiStore } from '@/stores/ui.store';
import LoadingState from '@/components/common/LoadingState.vue';

const ui = useUiStore();
const tipos = ref([]);
const loading = ref(true);
const form = reactive({ nombre_tipo: '', descripcion: '' });

const cargar = async () => {
  try { tipos.value = (await muestrasApi.listarTipos()).data; } finally { loading.value = false; }
};

const crear = async () => {
  try {
    await muestrasApi.crearTipo(form);
    ui.success('Tipo de muestra creado');
    Object.assign(form, { nombre_tipo: '', descripcion: '' });
    await cargar();
  } catch (e) { ui.error(e.message); }
};

onMounted(cargar);
</script>

<template>
  <h1 class="page-header">Tipos de muestra</h1>
  <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))">
    <form class="card" @submit.prevent="crear">
      <h2 style="margin-bottom:1rem">Nuevo tipo</h2>
      <div class="field"><label>Nombre</label><input v-model="form.nombre_tipo" required /></div>
      <div class="field"><label>Descripción</label><textarea v-model="form.descripcion" rows="3" /></div>
      <button class="btn">Crear</button>
    </form>

    <div class="card">
      <LoadingState :loading="loading" :empty="!tipos.length">
        <table>
          <thead><tr><th>Nombre</th><th>Descripción</th></tr></thead>
          <tbody>
            <tr v-for="t in tipos" :key="t.idtipomuestra"><td>{{ t.nombre_tipo }}</td><td>{{ t.descripcion || '—' }}</td></tr>
          </tbody>
        </table>
      </LoadingState>
    </div>
  </div>
</template>
