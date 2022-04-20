// import vue
import { createSSRApp } from "vue";
// import moment
import moment from "moment";
// import store
import { createPinia } from "pinia";
// import vueuse/head
import { createHead } from "@vueuse/head";
// import pinia persist
import piniaPersist from "pinia-plugin-persist";
// import socket
import { io } from "socket.io-client";
// import app
import App from "@/layouts/App.vue";
// import route
import { createRouter } from "@/router";
// import i18
import { createI18n } from "@/plugins/i18n";
// import font awesome icon
import { FontAwesomeIcon } from "@/plugins/fontAwesomeIcon";
// import styles
import "@/assets/custom.scss";
// ini setup interceptor
import setupInterceptors from "@/services/setupInterceptors";
// export
export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const head = createHead();
  const pinia = createPinia();
  const i18n = createI18n();
  // use router
  app.use(router);
  // use vueuse/head
  app.use(head);
  // set pinia-persist
  pinia.use(piniaPersist);
  // use store
  app.use(pinia);
  // ini socket
  const socket = io(import.meta.env.VITE_APP_PORT_SERVER, {
    transports: ["websocket", "polling"]
  });
  // provide socket
  app.provide("$socket", socket);
  // use i18n
  app.use(i18n);
  // provide moment
  app.provide("moment", moment);
  // use font awesome icon
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  // set setup interceptors
  setupInterceptors();
  // return
  return { app, router, head, pinia };
}
