<template>
  <nav class="app-content-top d-flex">
    <button type="button" class="btn btn-info" @click="ToggleMenu">
      <i class="fas fa-adivgn-left"></i>
      <span>{{ $t("menu-open") }}</span>
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
        {{ $t("menu-register") }}
      </router-link>
      <router-link :to="{ name: 'login' }">
        <font-awesome-icon icon="sign-in-alt" />
        {{ $t("menu-login") }}
      </router-link>
    </div>
    <div v-if="currentUser">
      <router-link to="/profile">
        <font-awesome-icon icon="user" />
        {{ currentUser.username }}
      </router-link>

      <button type="button" class="btn btn-info" @click="logOut">
        <font-awesome-icon icon="sign-out-alt" />
        {{ $t("menu-logout") }}
      </button>
    </div>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      Users online
    </button>

    <locale-select />
  </nav>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import { useStoreLayout } from "@/store/StoreLayout";
  import LocaleSelect from "@/components/LocaleSelect.vue";
  // ini use
  const router = useRouter();
  const storeAuth = useStoreAuth();
  const layout = useStoreLayout();
  // computed
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
  // functions
  const ToggleMenu = () => {
    layout.changeSidebar();
  };

  const logOut = () => {
    storeAuth.logout();
    router.push("/");
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
