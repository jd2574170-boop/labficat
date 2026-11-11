<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { solicitudesApi } from '@/api/solicitudes.api';
import { useUiStore } from '@/stores/ui.store';

const router = useRouter();
const ui = useUiStore();
const observaciones = ref('');
const loading = ref(false);

const crear = async () => {
  loading.value = true;
  try {
    const res = await solicitudesApi.crear({ observaciones: observaciones.value });
    ui.success(`Solicitud ${res.data.numero_radicado} creada. Ahora agrega tus muestras.`);
    router.push(`/app/solicitudes/${res.data.idsolicitud}`);
  } catch (e) {
    ui.error(e.errors?.map((x) => x.msg).join('. ') || e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <h1 class="page-header">Nueva solicitud de análisis</h1>
  <form class="card" style="max-width: 640px" @submit.prevent="crear">
    <div class="field">
      <label>Observaciones (opcional, máx. 500 caracteres)</label>
      <textarea v-model="observaciones" rows="5" maxlength="500" placeholder="Describe qué análisis necesitas…" />
    </div>
    <button class="btn" :disabled="loading">{{ loading ? 'Creando…' : 'Crear solicitud' }}</button>
  </form>
</template>
