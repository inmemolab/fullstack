<template>
  <div class="app-container">
    <AppAside />
    <component :is="route.meta.layout">
      <RouterView />
    </component>
    <ChatAside />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount, watch, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import appSoket from "../composables/appSoket";
  import appBrowser from "../composables/appBrowser";
  import appGeolocation from "../composables/appGeolocation";
  import AppAside from "./AppAside.vue";
  import ChatAside from "../components/ChatAside.vue";
  // ini use
  const route = useRoute();
  const storeAuth = useStoreAuth();
  const currentUser = computed(() => storeAuth.user);
  const { appSoketState, iniSocket, setUserPath, setUserid, setUserSoketDisconect } = appSoket();
  const { getUserBrowser } = appBrowser();
  const { getUserGeolocation } = appGeolocation();
  watch(
    // current path
    () => route.name,
    () => {
      setUserPath(route.name);
    }
  );
  watch(
    // current user
    () => currentUser.value,
    () => {
      const user = currentUser.value || 0;
      setUserid(user.id, user.username);
    }
  );
  onMounted(() => {
    const dataRoute = route.name;
    const dataUser = currentUser.value || {};
    const dataUserId = dataUser.id || 0;
    const dataUserName = dataUser.username || "";
    iniSocket(dataRoute, dataUserId, dataUserName);
    // getUserBrowser();
    // getUserGeolocation();
  });
  onBeforeUnmount(() => {
    setUserSoketDisconect();
  });
</script>

<style>
  .app-layout {
    display: flex;
  }
</style>
