<template>
  <div
    id="offcanvasRight"
    class="offcanvas offcanvas-end"
    tabindex="-1"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Users</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul v-if="list">
        <li v-for="(item, index) in list" :key="index">
          <div>{{ item.userOnline }}</div>
          <div>{{ item.userUUID }}</div>
          <div>{{ item.userSocketId }}</div>
          <div>{{ item.userAuthId }}</div>
          <div>{{ item.userAuthUsername }}</div>
          <div>{{ item.userIp }}</div>
          <div>{{ item.userPath }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import appSoket from "../composables/appSoket";
  const { appSoketState } = appSoket();

  const list = computed(() => appSoketState.usersList);
</script>
