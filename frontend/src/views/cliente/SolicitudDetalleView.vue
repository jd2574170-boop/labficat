<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { solicitudesApi } from '@/api/solicitudes.api';
import { muestrasApi } from '@/api/muestras.api';
import { pagosApi } from '@/api/pagos.api';
import { resultadosApi } from '@/api/resultados.api';
import { inconformidadesApi } from '@/api/inconformidades.api';
import { ESTADOS_SOLICITUD } from '@/utils/constants';
import { formatDate, fileUrl } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';
import LoadingState from '@/components/common/LoadingState.vue';

const props = defineProps({ id: { type: String, required: true } });
const auth = useAuthStore();
const ui = useUiStore();

const solicitud = ref(null);
const muestras = ref([]);
const tipos = ref([]);
const resultados = ref([]);
const loading = ref(true);

const muestraForm = reactive({ descripcion: '', cantidad: 1, tipos_muestra_idtipomuestra: '' });
const pagoForm = reactive({ monto: '', comprobante_url: '' });
const inconformidad = ref('');
const resultadoForm = reactive({ observaciones: '', archivo: null });
const idPagoVerificar = ref('');

const cargar = async () => {
  loading.value = true;
  try {
    solicitud.value = (await solicitudesApi.obtener(props.id)).data;
    const [m, t, r] = await Promise.all([
      muestrasApi.porSolicitud(props.id),
      muestrasApi.listarTipos(),
      resultadosApi.porSolicitud(props.id)
    ]);
    muestras.value = m.data;
    tipos.value = t.data;
    resultados.value = r.data;
  } catch (e) {
    ui.error(e.message);
  } finally {
    loading.value = false;
  }
};

// Envuelve cada acción para mostrar toast y recargar
const run = async (fn, okMsg, reload = true) => {
  try { await fn(); ui.success(okMsg); if (reload) await cargar(); }
  catch (e) { ui.error(e.errors?.map((x) => x.msg).join('. ') || e.message); }
};

const agregarMuestra = () => run(async () => {
  await muestrasApi.agregar({ ...muestraForm, solicitudes_idsolicitud: Number(props.id) });
  Object.assign(muestraForm, { descripcion: '', cantidad: 1, tipos_muestra_idtipomuestra: '' });
}, 'Muestra agregada');

const registrarPago = () => run(async () => {
  const res = await pagosApi.registrar({ ...pagoForm, solicitudes_idsolicitud: Number(props.id) });
  ui.success(`Pago registrado (ID ${res.data.idpago})`);
  Object.assign(pagoForm, { monto: '', comprobante_url: '' });
}, 'Comprobante enviado', false);

const verificarPago = (estado) => run(
  () => pagosApi.verificar(idPagoVerificar.value, estado), `Pago ${estado.toLowerCase()}`, false
);

const cambiarEstado = (e) => run(() => solicitudesApi.cambiarEstado(props.id, e.target.value), 'Estado actualizado');

const reportarInconformidad = () => run(async () => {
  await inconformidadesApi.registrar({ descripcion_problema: inconformidad.value, solicitudes_idsolicitud: Number(props.id) });
  inconformidad.value = '';
}, 'Inconformidad registrada', false);

const subirResultado = () => run(async () => {
  const fd = new FormData();
  fd.append('archivo_resultado', resultadoForm.archivo);
  fd.append('observaciones', resultadoForm.observaciones);
  fd.append('solicitudes_idsolicitud', props.id);
  await resultadosApi.subir(fd);
  Object.assign(resultadoForm, { observaciones: '', archivo: null });
}, 'Resultado cargado y solicitud finalizada');

onMounted(cargar);
</script>

<template>
  <LoadingState :loading="loading" :empty="!solicitud">
    <div class="page-header">
      <div>
        <h1>{{ solicitud?.numero_radicado }}</h1>
        <p class="muted">Creada el {{ formatDate(solicitud?.fecha_solicitud) }} · {{ solicitud?.cliente_nombre }}</p>
      </div>
      <div style="display:flex; gap:.5rem; align-items:center">
        <StatusBadge :status="solicitud?.estado" />
        <select v-if="auth.isStaff" :value="solicitud?.estado" @change="cambiarEstado">
          <option v-for="e in ESTADOS_SOLICITUD" :key="e">{{ e }}</option>
        </select>
      </div>
    </div>

    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))">
      <!-- Observaciones -->
      <section class="card">
        <h2>Observaciones</h2>
        <p class="muted" style="margin-top:.5rem">{{ solicitud?.observaciones || 'Sin observaciones' }}</p>
      </section>

      <!-- Muestras -->
      <section class="card">
        <h2>Muestras</h2>
        <p v-if="!muestras.length" class="muted">Sin muestras registradas.</p>
        <ul v-else style="margin: .5rem 0 1rem 1rem">
          <li v-for="m in muestras" :key="m.idmuestra">
            <strong>{{ m.codigo_muestra }}</strong> — {{ m.tipo_muestra_nombre }} ({{ m.cantidad }}): {{ m.descripcion }}
          </li>
        </ul>
        <form @submit.prevent="agregarMuestra">
          <div class="field"><label>Tipo</label>
            <select v-model="muestraForm.tipos_muestra_idtipomuestra" required>
              <option value="" disabled>Selecciona…</option>
              <option v-for="t in tipos" :key="t.idtipomuestra" :value="t.idtipomuestra">{{ t.nombre_tipo }}</option>
            </select>
          </div>
          <div class="field"><label>Descripción</label><input v-model="muestraForm.descripcion" required /></div>
          <div class="field"><label>Cantidad</label><input v-model.number="muestraForm.cantidad" type="number" min="1" required /></div>
          <button class="btn btn-sm">Agregar muestra</button>
        </form>
      </section>

      <!-- Pago -->
      <section class="card">
        <h2>Pago</h2>
        <form v-if="auth.isCliente || auth.isAdmin" @submit.prevent="registrarPago">
          <div class="field"><label>Monto (COP)</label><input v-model="pagoForm.monto" type="number" min="0" required /></div>
          <div class="field"><label>URL del comprobante</label><input v-model="pagoForm.comprobante_url" type="url" required /></div>
          <button class="btn btn-sm">Registrar comprobante</button>
        </form>
        <div v-if="auth.isStaff" style="margin-top:1rem">
          <div class="field"><label>ID del pago a verificar</label><input v-model="idPagoVerificar" type="number" /></div>
          <button class="btn btn-sm" :disabled="!idPagoVerificar" @click="verificarPago('Aprobado')">Aprobar</button>
          <button class="btn btn-sm btn-danger" :disabled="!idPagoVerificar" style="margin-left:.4rem" @click="verificarPago('Rechazado')">Rechazar</button>
        </div>
      </section>

      <!-- Resultados -->
      <section class="card">
        <h2>Resultados</h2>
        <p v-if="!resultados.length" class="muted">Aún no hay resultados cargados.</p>
        <ul v-else style="margin: .5rem 0 1rem 1rem">
          <li v-for="r in resultados" :key="r.idresultado">
            <a :href="fileUrl(r.archivo_url)" target="_blank" rel="noopener">Descargar resultado #{{ r.idresultado }}</a>
            <span class="muted"> — {{ r.observaciones }}</span>
          </li>
        </ul>
        <form v-if="auth.isStaff" @submit.prevent="subirResultado">
          <div class="field"><label>Archivo (PDF/JPG/PNG, máx. 5 MB)</label>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" required @change="resultadoForm.archivo = $event.target.files[0]" />
          </div>
          <div class="field"><label>Observaciones</label><textarea v-model="resultadoForm.observaciones" rows="2" /></div>
          <button class="btn btn-sm">Subir resultado</button>
        </form>
      </section>

      <!-- Inconformidad -->
      <section class="card">
        <h2>Reportar inconformidad</h2>
        <form @submit.prevent="reportarInconformidad">
          <div class="field"><textarea v-model="inconformidad" rows="3" required placeholder="Describe el problema…" /></div>
          <button class="btn btn-outline btn-sm">Enviar</button>
        </form>
      </section>
    </div>
  </LoadingState>
</template>
