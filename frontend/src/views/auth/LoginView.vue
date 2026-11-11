<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({ correo: '', password: '' });
const loading = ref(false);
const error = ref('');

const submit = async () => {
  error.value = '';
  loading.value = true;
  try {
    await auth.login(form);
    router.push(route.query.redirect || { name: 'dashboard' });
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <h2 style="margin-bottom: 1rem">Iniciar sesión</h2>
    <div v-if="error" class="alert-error">{{ error }}</div>

    <div class="field">
      <label for="correo">Correo electrónico</label>
      <input id="correo" v-model="form.correo" type="email" required autocomplete="email" />
    </div>
    <div class="field">
      <label for="password">Contraseña</label>
      <input id="password" v-model="form.password" type="password" required autocomplete="current-password" />
    </div>

    <button class="btn" style="width: 100%" :disabled="loading">{{ loading ? 'Ingresando…' : 'Ingresar' }}</button>
    <p class="muted" style="margin-top: 1rem; text-align: center">
      ¿No tienes cuenta? <RouterLink to="/registro">Regístrate</RouterLink>
    </p>
  </form>
</template>
