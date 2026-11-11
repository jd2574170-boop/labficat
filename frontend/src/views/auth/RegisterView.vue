<script setup>
import { reactive, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
const router = useRouter();

// El registro público SIEMPRE crea clientes; los demás roles los gestiona un administrador
const form = reactive({ nombre: '', correo: '', telefono: '', password: '', tipo_usuario: 'Cliente' });
const loading = ref(false);
const error = ref('');

const submit = async () => {
  error.value = '';
  loading.value = true;
  try {
    await auth.register(form);
    router.push({ name: 'dashboard' });
  } catch (e) {
    error.value = e.errors?.map((x) => x.msg).join('. ') || e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <h2 style="margin-bottom: 1rem">Crear cuenta</h2>
    <div v-if="error" class="alert-error">{{ error }}</div>

    <div class="field"><label>Nombre completo</label><input v-model="form.nombre" required minlength="3" /></div>
    <div class="field"><label>Correo electrónico</label><input v-model="form.correo" type="email" required /></div>
    <div class="field"><label>Teléfono</label><input v-model="form.telefono" type="tel" /></div>
    <div class="field"><label>Contraseña (mín. 6 caracteres)</label><input v-model="form.password" type="password" required minlength="6" /></div>

    <button class="btn" style="width: 100%" :disabled="loading">{{ loading ? 'Creando…' : 'Registrarme' }}</button>
    <p class="muted" style="margin-top: 1rem; text-align: center">
      ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
    </p>
  </form>
</template>
