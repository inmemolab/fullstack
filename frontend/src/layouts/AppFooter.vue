<template>
  <footer class="app-footer">
    <div>&copy; 2020-{{ currentYear }}</div>
  </footer>
</template>

<script setup lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
  .app-footer {
    width: 100%;
    height: 32px;
    z-index: 999;
    background: #d6d6d6;
  }
</style>
