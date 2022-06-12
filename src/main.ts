import Vue from 'vue';
import compositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const libraries = [compositionAPI];

libraries.forEach((library) => {
  Vue.use(library);
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
