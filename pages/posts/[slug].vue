<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from "vue";
import ThemeKit from "@reblog/themekit/dist/esm";
import { useRoute } from "vue-router";

// eslint-disable-next-line no-undef
const mainConfig = useAppConfig();
const serverUrl = mainConfig.config.serverConfig.url;
const slug = useRoute().params.slug;

const themeKit = new ThemeKit({
  server: {
    url: serverUrl,
  },
});

const showAside = ref(false);
const articleGlobalData = ref(null);

const dataLoad = async () => {
  const articleData = await themeKit.getArticle(slug.toString());
  showAside.value = true;
  return articleData;
};

onMounted(async () => {
  articleGlobalData.value = await dataLoad();
});
</script>

<template>
  <div class="flex flex-wrap flex-row justify-center mt-20 mb-20">
    <div
      class="posts-part bg-white border border-solid hover:border-indigo-300 rounded-lg p-5 border-black/20 mr-8 max-w-5xl dark:bg-[#0d1117]/60 dark:backdrop-blur-sm dark:text-white light:text-black"
      @load="postsLoaded"
    >
      <template v-if="articleGlobalData">
        <MarkdownRenderer :markdownContent="articleGlobalData?.content" />
      </template>
    </div>
    <BodyAside v-if="showAside" />
  </div>
</template>

<style scoped>
.body-posts-item {
  transition: 0.2s;
}
.body-posts-list {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.posts-part {
  transition: 0.2s;
  word-wrap: break-word;
  min-width: 58rem;
  width: calc(100% - 300px);
  padding: 1rem 2.2rem 2.2rem;
}
.markdown-body {
  transition: 0.2s;
}
</style>
