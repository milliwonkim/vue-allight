import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({ email: '', uid: '' }),
  getters: {
    getAuth: (state) => state,
  },
});
