<script setup>
import { ref, onMounted } from 'vue';
import { usuariosApi } from '@/api/usuarios.api';
import { useUiStore } from '@/stores/ui.store';
import { formatDate } from '@/utils/formatters';
import LoadingState from '@/components/common/LoadingState.vue';

const ui = useUiStore();
const usuarios = ref([]);
const loading = ref(true);

const cargar = async () => {
  try { usuarios.value = (await usuariosApi.listar()).data; } finally { loading.value = false; }
};

const toggle = async (u) => {
  try {
    await usuariosApi.cambiarEstado(u.idusuarios, u.estado ? 0 : 1);
    ui.success('Estado actualizado');
    await cargar();
  } catch (e) { ui.error(e.message); }
};

onMounted(cargar);
</script>

<template>
  <h1 class="page-header">Usuarios</h1>
  <div class="card">
    <LoadingState :loading="loading" :empty="!usuarios.length">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Registro</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.idusuarios">
              <td>{{ u.nombre }}</td><td>{{ u.correo }}</td><td>{{ u.tipo_usuario }}</td>
              <td>{{ formatDate(u.fecha_registro) }}</td>
              <td>{{ u.estado ? 'Activo' : 'Inactivo' }}</td>
              <td><button class="btn btn-outline btn-sm" @click="toggle(u)">{{ u.estado ? 'Desactivar' : 'Activar' }}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </LoadingState>
  </div>
</template>
