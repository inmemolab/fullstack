// ini import
import { defineStore } from "pinia";
import { getList } from "@/apis/test";
// export
export const useTestStore = defineStore("test", {
  state: () => {
    return {
      items: {} as any
    };
  },
  actions: {
    async featchItem(id: string) {
      const { data } = await getList();
      this.items[id] = data.data;
      console.log(data);
    }
  }
});
