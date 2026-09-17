import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "@/styles/common.scss";
import "element-plus/dist/index.css";

import { lazyPlugin } from "@/directives/index.js";
import { componentPlugin } from "./components/imdex.js";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
