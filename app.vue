<!-- eslint-disable no-undef -->
<script setup>
import { onMounted } from "vue";
import "primeicons/primeicons.css";

const mainConfig = useAppConfig();
const themeSet = mainConfig.config.theme;

onMounted(() => {
  Object.keys(themeSet.light).forEach((key) => {
    document.documentElement.style.setProperty(
      `--macaron-light-${key}`,
      themeSet.light[key]
    );
  });
  Object.keys(themeSet.dark).forEach((key) => {
    document.documentElement.style.setProperty(
      `--macaron-dark-${key}`,
      themeSet.dark[key]
    );
  });
});
</script>

<template>
  <div>
    <navigationBar />
    <banner />
    <nuxtPage />
  </div>
</template>
