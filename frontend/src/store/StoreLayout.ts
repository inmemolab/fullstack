import { defineStore } from "pinia";

export const useStoreLayout = defineStore("layoutStore", {
  state: () => ({
    appLocale: "es",
    isSidebar: true
  }),
  getters: {
    getAppLocale: (state) => state.appLocale,
    getIsActive: (state) => state.isSidebar
  },
  actions: {
    changeLocale(dataLocale: string) {
      this.appLocale = dataLocale;
    },
    changeSidebar() {
      const isData = !this.isSidebar;
      this.isSidebar = isData;
    }
  }
});
