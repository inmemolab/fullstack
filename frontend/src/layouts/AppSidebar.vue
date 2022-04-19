<template>
  <nav class="sidebar" :class="`${isSidebarData ? 'active' : ''}`"></nav>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStoreLayout } from "@/store/StoreLayout";

  // name: "AppSidebar",

  const layout = useStoreLayout();
  const isSidebarData = computed(() => layout.isSidebar);
</script>
