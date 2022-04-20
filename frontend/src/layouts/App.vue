<template>
  <div class="app-container">
    <AppAside />
    <component :is="route.meta.layout">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted, onBeforeUnmount, ref, reactive, watch, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import AppAside from "./AppAside.vue";
  // ini use
  const route = useRoute();
  const storeAuth = useStoreAuth();
  const currentUser = computed(() => storeAuth.user);
</script>

<style>
  .app-layout {
    display: flex;
  }
</style>
