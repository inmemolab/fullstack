<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useHead } from "@vueuse/head";
  import { useStoreAuth } from "@/store/StoreAuth";
  import UserService from "@/services/userDataService";
  // ini use
  const router = useRouter();
  const route = useRoute();
  const storeAuth = useStoreAuth();
  // computes user is login
  const loggedIn = computed(() => storeAuth.status.loggedIn);
  // if user log in
  if (loggedIn.value === false) {
    router.push("/");
  }
  // const view
  const content = ref("");
  // set use head
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
  // vierify user
  UserService.getAdminBoard().then(
    (response) => {
      content.value = response.data;
    },
    (error) => {
      content.value =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      if (error.response && error.response.status === 403) {
        storeAuth.logout();
      }
    }
  );
</script>
