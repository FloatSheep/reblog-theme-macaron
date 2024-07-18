<script setup>
import { onMounted } from "vue";
import "primeicons/primeicons.css";

const mainConfig = useAppConfig();
const themeSet = mainConfig.config.theme;

onMounted(() => {
  Object.keys(themeSet).forEach((key) => {
    document.documentElement.style.setProperty(
      `--macaron-${key}`,
      themeSet[key]
    );
  });
});
</script>

<template>
  <div>
    <navigationBar />
    <banner />
    <NuxtPage />
  </div>
</template>
