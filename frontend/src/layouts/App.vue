<template>
  <div class="app-container">
    <AppAside />
    <component :is="route.meta.layout || 'div'">
      <span>{{ numUsers.num }}</span>
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted, onBeforeUnmount, ref, reactive, watch, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import { useHead } from "@vueuse/head";
  import AppAside from "./AppAside.vue";
  // name: "App",

  const route = useRoute();
  const storeAuth = useStoreAuth();
  useHead({
    title: "Default title",
    meta: [
      {
        name: "description",
        content: "This is a DEFAULT description"
      },
      {
        name: "other-stuff",
        content: "This is some OTHER stuff"
      }
    ]
  });
  const currentUser = computed(() => storeAuth.user);
  const userSocketId = ref();
  const $socket: any = inject("$socket");

  watch(
    () => route.name,
    () => {
      console.log(route.name);
      const userRoute = {
        socketId: userSocketId.value,
        path: route.name,
        userId: 0
      };
      $socket.emit("userSetPath", userRoute);
    }
  );

  watch(
    () => currentUser.value,
    () => {
      const user = currentUser.value || 0;
      console.log(user.id);
      const userRoute = {
        socketId: userSocketId.value,
        userId: user.id
      };
      $socket.emit("userSetId", userRoute);
    }
  );

  $socket.onAny((event: any, ...args: any) => {
    console.log(event, args);
  });

  const numUsers = reactive({ num: 0 });
  $socket.on("numUsers", function (data: number) {
    numUsers.num = data;
    console.log(data);
  });

  // $socket.on("users", (users) => {
  //   users.forEach((user) => {
  //     user.self = user.userID === socket.id;
  //     initReactiveProperties(user);
  //   });
  //   // put the current user first, and then sort by username
  //   this.users = users.sort((a, b) => {
  //     if (a.self) return -1;
  //     if (b.self) return 1;
  //     if (a.username < b.username) return -1;
  //     return a.username > b.username ? 1 : 0;
  //   });
  // });

  onMounted(() => {
    const newMsg = {
      msg: "hola tipo-app"
    };
    $socket.emit("iniApp", newMsg);
    $socket.on("newUserIP", (data: { msg: string; ip: string; idSocket: string }) => {
      userSocketId.value = data.idSocket;
      console.log("message: " + data.msg + " - ip: " + data.ip + " - sc: " + data.idSocket);
    });
    $socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
  onBeforeUnmount(() => {
    // $socket.off(SOCKET.EVENTS.LOGIN_SUC);
    // $socket.off(SOCKET.EVENTS.LOGIN_ERR);
  });
</script>

<style>
  .app-layout {
    display: flex;
  }
</style>
