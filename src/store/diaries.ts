import { defineStore } from 'pinia';

export const useDiariesStore = defineStore('useDiariesStore', {
  state: () => ({
    diaries: [{ id: 0, title: '', contents: '', date: new Date() }],
  }),
  getters: {
    getDiaries: (state) => state.diaries,
  },
});
