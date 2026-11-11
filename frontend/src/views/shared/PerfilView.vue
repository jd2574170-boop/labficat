<script setup>
import { ref, onMounted } from 'vue';
import { usuariosApi } from '@/api/usuarios.api';
import { formatDate } from '@/utils/formatters';
import LoadingState from '@/components/common/LoadingState.vue';

const perfil = ref(null);
const loading = ref(true);

onMounted(async () => {
  try { perfil.value = (await usuariosApi.perfil()).data; } finally { loading.value = false; }
});
</script>

<template>
  <h1 class="page-header">Mi perfil</h1>
  <LoadingState :loading="loading" :empty="!perfil">
    <div class="card" style="max-width: 520px">
      <p><strong>Nombre:</strong> {{ perfil.nombre }}</p>
      <p><strong>Correo:</strong> {{ perfil.correo }}</p>
      <p><strong>Teléfono:</strong> {{ perfil.telefono || '—' }}</p>
      <p><strong>Rol:</strong> {{ perfil.tipo_usuario }}</p>
      <p><strong>Registrado:</strong> {{ formatDate(perfil.fecha_registro) }}</p>
    </div>
  </LoadingState>
</template>
