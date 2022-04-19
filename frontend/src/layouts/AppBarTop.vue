<template>
  <nav class="app-content-top d-flex">
    <button type="button" class="btn btn-info" @click="ToggleMenu">
      <i class="fas fa-adivgn-left"></i>
      <span>Toggle Sidebar</span>
    </button>

    <div v-if="showAdminBoard">
      <router-link to="/admin">Admin Board</router-link>
    </div>
    <div v-if="showModeratorBoard">
      <router-link to="/mod">Moderator Board</router-link>
    </div>
    <div>
      <router-link v-if="currentUser" to="/user">User</router-link>
    </div>

    <div v-if="!currentUser">
      <router-link :to="{ name: 'register' }">
        <font-awesome-icon icon="user-plus" />
        Sign Up
      </router-link>

      <router-link :to="{ name: 'login' }">
        <font-awesome-icon icon="sign-in-alt" />
        Login
      </router-link>
    </div>
    <div v-if="currentUser">
      <router-link to="/profile">
        <font-awesome-icon icon="user" />
        {{ currentUser.username }}
      </router-link>

      <button type="button" class="btn btn-info" @click="logOut">
        <font-awesome-icon icon="sign-out-alt" />
        LogOut
      </button>
    </div>
    <locale-select />
  </nav>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useStoreLayout } from "@/store/StoreLayout";
  import { useStoreAuth } from "@/store/StoreAuth";
  import LocaleSelect from "@/components/LocaleSelect.vue";
  import EventBus from "../plugins/eventBus";

  // name: "AppNavbar",

  const router = useRouter();
  const layout = useStoreLayout();
  const storeAuth = useStoreAuth();

  const currentUser = computed(() => storeAuth.user);
  const showAdminBoard = computed(() => {
    if (currentUser.value && currentUser.value.roles) {
      return currentUser.value.roles.includes("ROLE_ADMIN");
    }

    return false;
  });
  const showModeratorBoard = computed(() => {
    if (currentUser.value && currentUser.value.roles) {
      return currentUser.value.roles.includes("ROLE_MODERATOR");
    }

    return false;
  });

  const ToggleMenu = () => {
    layout.changeSidebar();
  };

  EventBus.on("logout", () => {
    logOut();
  });
  const logOut = () => {
    storeAuth.logout();
    router.push("/login");
  };
</script>

<style lang="scss" scoped>
  .app-content-top {
    width: 100%;
    height: 40px;
    z-index: 999;
    background: #d6d6d6;
  }
</style>
