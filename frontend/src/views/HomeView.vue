<template>
  <h3>Async Data List</h3>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item.name }} - {{ item.age }}</li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { RouteLocationNormalized, useRoute } from "vue-router";
  import { useTestStore } from "../store/test";
  const route = useRoute();
  const testStore = useTestStore();
  const list = ref(testStore.items[route.fullPath]);
</script>

<script lang="ts">
  export default {
    asyncData({ store, route }: { store: any; route: RouteLocationNormalized }) {
      const testStore = useTestStore(store);
      return testStore.featchItem(route.fullPath);
    }
  };
</script>
