<template>
  <div>About</div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { useHead } from "@vueuse/head";
  const route = useRoute();

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
