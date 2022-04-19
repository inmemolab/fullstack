<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";

  import UserService from "@/services/userDataService";
  import EventBus from "@/plugins/eventBus";

  // name: "BoardModerator",
  const router = useRouter();
  const storeAuth = useStoreAuth();

  const loggedIn = computed(() => storeAuth.status.loggedIn);
  const content = ref("");
  if (!loggedIn.value) {
    router.push("/home");
  }

  UserService.getModeratorBoard().then(
    (response) => {
      content.value = response.data;
    },
    (error) => {
      content.value =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      if (error.response && error.response.status === 403) {
        EventBus.dispatch("logout");
      }
    }
  );
</script>
