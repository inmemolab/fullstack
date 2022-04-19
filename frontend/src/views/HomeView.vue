<template>
  <h3>Async Data List</h3>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item.name }} - {{ item.age }}</li>
  </ul>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import { RouteLocationNormalized, useRoute } from "vue-router";
  import { useHead } from "@vueuse/head";
  import { useTestStore } from "../store/test";
  const route = useRoute();
  const testStore = useTestStore();
  const list = ref(testStore.items[route.fullPath]);

  const title = computed(() => route.meta.title as string);
  const description = computed(() => route.meta.description as string);
  const keywords = computed(() => route.meta.keywords as string);
  const author = computed(() => route.meta.author as string);
  useHead({
    title: title,
    meta: [
      {
        name: "description",
        content: description
      },
      {
        name: "keywords",
        content: keywords
      },
      {
        name: "author",
        content: author
      }
    ]
  });
</script>

<script lang="ts">
  export default {
    asyncData({ store, route }: { store: any; route: RouteLocationNormalized }) {
      const testStore = useTestStore(store);
      return testStore.featchItem(route.fullPath);
    }
  };
</script>
