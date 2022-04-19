<template>
  <AppSidebar />
  <div class="app-content" :class="`${isSidebarData ? 'active' : ''}`">
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

  // name: "LayoutAuth",

  const layout = useStoreLayout();
  const isSidebarData = computed(() => layout.isSidebar);
  const $socket: any = inject("$socket");

  const newMsg = {
    msg: "new window"
  };
  $socket.emit("iniApp", newMsg);
</script>
