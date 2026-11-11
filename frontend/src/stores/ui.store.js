import { defineStore } from 'pinia';

// Notificaciones tipo "toast" globales
export const useUiStore = defineStore('ui', {
  state: () => ({ toasts: [], nextId: 1 }),
  actions: {
    notify(message, type = 'success', ms = 3500) {
      const id = this.nextId++;
      this.toasts.push({ id, message, type });
      setTimeout(() => this.dismiss(id), ms);
    },
    success(msg) { this.notify(msg, 'success'); },
    error(msg) { this.notify(msg, 'error', 5000); },
    dismiss(id) { this.toasts = this.toasts.filter((t) => t.id !== id); }
  }
});
