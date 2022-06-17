import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {},
  }),
  getters: {
    getAuth: (state) => state.auth,
  },
});
