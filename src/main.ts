import { createApp } from 'vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import { Quasar } from 'quasar';
import { initializeApp } from 'firebase/app';
import { createPinia } from 'pinia';
import { getAnalytics } from 'firebase/analytics';
import router from './router';
import App from './App.vue';
import quasarUserOptions from './quasar-user-options';
import '@/App.scss';
import { firebaseConfig } from './firebase';

const pinia = createPinia();

/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App);

AOS.init();
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

app
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Quasar, quasarUserOptions)
  .use(pinia)
  .use(router)
  .mount('#app');
