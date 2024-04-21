import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap';

import store from './store/vuex'; // import your Vuex store
import router from "./router";

createApp(App).use(router).use(store).mount("#app");