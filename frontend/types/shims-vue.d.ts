/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// json files
declare module "*.json" {
  const value: any;
  export default value;
}
// svg files
declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}
// png files
declare module "*.png" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}
