<template>
  <AppSidebar />
  <div class="app-content" :class="`${isSidebarData ? 'active' : 'inactive'}`">
    <AppBarTop />
    <main class="app-content-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from "vue";
  import AppBarTop from "./AppBarTop.vue";
  import AppSidebar from "./AppSidebar.vue";
  import AppFooter from "./AppFooter.vue";
  import { useStoreLayout } from "@/store/StoreLayout";
  // ini use
  const layout = useStoreLayout();
  // computed
  const isSidebarData = computed(() => layout.isSidebar);
</script>
