import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import {store} from "@/store/store";

const emitter = mitt();
const app = createApp(App);
app.use(store);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
