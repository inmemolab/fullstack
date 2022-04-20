<template>
  <nav class="sidebar" :class="`${isSidebarData ? 'active' : 'inactive'}`"></nav>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStoreLayout } from "@/store/StoreLayout";
  // ini use
  const layout = useStoreLayout();
  // computed
  const isSidebarData = computed(() => layout.isSidebar);
</script>
