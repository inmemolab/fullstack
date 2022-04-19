// ini import
import { renderToString } from "vue/server-renderer";
import { renderHeadToString } from "@vueuse/head";
import { createApp } from "./main";
// export render
export async function render(url: string, manifest: Record<string, string[]>) {
  // create app
  const { app, router, head, pinia } = createApp();
  // push router url
  router.push(url);
  // await router ready
  await router.isReady();
  // mach components
  const matchedComponents = router.currentRoute.value.matched;
  // await promise
  await Promise.all(
    matchedComponents.map((item) => {
      // @ts-ignore
      if (item.components.default.asyncData) {
        // @ts-ignore
        return item.components.default.asyncData({
          pinia,
          route: router.currentRoute.value
        });
      }
    })
  );
  // ini ctx
  const ctx = {} as any;
  // load html with app and ctx
  const html = await renderToString(app, ctx);
  // load render preload links
  const preloadLinks = renderPreloadLinks(ctx.modules || new Set<string>(), manifest);
  // render head
  const renderedHead = renderHeadToString(head);
  // return all data
  return [html, preloadLinks, renderedHead, pinia];
}
// render preload links
function renderPreloadLinks(modules: Set<string>, manifest: any) {
  let links = "";
  const seen = new Set();
  modules.forEach((id: string) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
// render preload link
function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  }
  // TODO
  return "";
}
