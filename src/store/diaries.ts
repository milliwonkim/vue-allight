import { defineStore } from 'pinia';

export const useDiariesStore = defineStore('useDiariesStore', {
  state: () => ({
    diaries: [],
  }),
  getters: {
    getDiaries: (state) => {
      console.log('state.diaries: ', state.diaries);
      return state.diaries;
    },
  },
});
