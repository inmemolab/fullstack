<template>
  <div>
    <select id="locale-select" v-model="locale">
      <option
        v-for="availableLocale in SUPPORT_LOCALES"
        :key="availableLocale"
        :value="availableLocale"
      >
        {{ availableLocale }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { SUPPORT_LOCALES } from "@/plugins/i18n";
  const { locale } = useI18n();
</script>
