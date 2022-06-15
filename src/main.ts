import { createApp } from 'vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import router from './router';
import App from './App.vue';

import 'aos/dist/aos.css';

/* add icons to the library */
library.add(faUserSecret);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
