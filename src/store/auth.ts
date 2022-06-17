import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: {},
  }),
  getters: {
    auth: (state) => state.auth,
  },
});
