// ini import
import { createApp } from "./main";
// import bootstrap-Js
import "bootstrap";
// ini setup interceptor
import setupInterceptors from "@/services/setupInterceptors";
// create app
const { app, router, pinia } = createApp();
// set setup interceptors
setupInterceptors();
// @ts-ignore
if (window.__SSR_STATE__) {
  // @ts-ignore
  pinia.state.value = JSON.parse(window.__SSR_STATE__);
}
// set windows on top allways
router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});
// if router ready
router.isReady().then(() => {
  router.beforeResolve(async (to, from) => {
    let diffed = false;
    const activated = to.matched.filter((c, i) => {
      return diffed || (diffed = from.matched[i] !== c);
    });
    if (!activated.length) {
      return false;
    }
    await Promise.all(
      activated.map((c) => {
        // @ts-ignore
        if (c.components.default.asyncData) {
          // @ts-ignore
          return c.components.default.asyncData({ pinia, route: to });
        }
        return true;
      })
    );
  });
  // mount app
  app.mount("#app");
});
