<!-- eslint-disable no-undef -->
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ThemeKit from "@reblog/themekit/dist/esm";

const siteConfig = useAppConfig();

const themeKit = new ThemeKit({
  server: {
    url: siteConfig.config.serverConfig.url,
  },
});

const route = useRoute();

const postTitle = ref("");

async function getSlug() {
  if (route.params.slug !== undefined) {
    const articleData = await themeKit.getArticle(route.params.slug.toString());
    postTitle.value = articleData?.title;
  } else {
    postTitle.value = undefined;
  }
}

watch(
  () => route.params.slug,
  async () => {
    await getSlug();
  }
);

onMounted(async () => {
  await getSlug();
});
</script>

<template>
  <div id="banner" class="mt-20">
    <h1 class="md:text-4xl font-bold dark:text-white light:text-black">
      <template v-if="postTitle">
        {{ postTitle }}
      </template>
      <template v-else>
        你好，欢迎来到 {{ siteConfig.config.siteName }}
      </template>
    </h1>
    <p
      id="banner-subtitle"
      class="md:text-2xl font-normal mt-7 dark:text-white light:text-black"
    >
      {{ siteConfig.config.siteSubtitle }}
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
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
