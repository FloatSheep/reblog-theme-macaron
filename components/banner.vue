<script setup>
const siteConfig = useAppConfig();
</script>

<template>
  <div id="banner" class="mt-20">
    <h1 class="md:text-4xl font-bold">你好，欢迎来到 {{ siteConfig.config.siteName }}</h1>
    <p id="banner-subtitle" class="md:text-2xl font-normal mt-7">{{ siteConfig.config.siteSubtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "banner",
};
</script>

<style scoped>
#banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
