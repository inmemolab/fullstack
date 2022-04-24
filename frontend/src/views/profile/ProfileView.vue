<template>
  <div v-if="currentUser" class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong>
        Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import { useHead } from "@vueuse/head";
  // ini use
  const router = useRouter();
  const route = useRoute();
  const storeAuth = useStoreAuth();
  // computes user is login
  const currentUser = computed(() => storeAuth.user);
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
  // if user log in
  onMounted(() => {
    if (!currentUser.value) {
      router.push("/login");
    }
  });
</script>
