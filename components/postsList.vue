<!-- eslint-disable no-undef -->
<script setup>
import ThemeKit from "@reblog/themekit/dist/esm";
import { ref } from "vue";

const mainConfig = useAppConfig();
const serverUrl = mainConfig.config.serverConfig.url;

const themekit = new ThemeKit({
  server: {
    url: serverUrl,
  },
});

const articles = ref([]);

themekit.getArticleList().then((data) => {
  articles.value = data.articles;
});
</script>

<template>
  <div>
    <div
      class="body-posts-list md:max-w-96 sm:max-w-64 w-full flex flex-col"
    >
      <div
        class="body-posts-item item-start md:max-w-96 md:min-w-max bg-white dark:bg-gray-950/60 dark:backdrop-blur-sm max-w-full border border-solid border-black/20 hover:border-indigo-300 rounded-lg p-5 flex flex-col items-start my-2 dark:text-white light:text-black"
        v-for="article in articles"
        :key="article.id"
      >
        <router-link
          :to="'/posts/' + article.slug"
          s
          class="flex flex-col content-start items-start"
        >
          <p id="posts-title" class="text-lg font-medium antialiased">{{ article.title }}</p>
          <p id="posts-desc" class="antialiased dark:text-white text-gray-950/75">{{ article.desc }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postsList",
  mounted() {
    this.$emit('posts-loaded');
  }
};
</script>

<style scoped>
.body-posts-item {
  transition: 0.2s;
  padding: 1.6rem 2rem;
}
.body-posts-list {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
@media (min-width: 768px) {
  .body-posts-list {
    margin-left: 23vw;
  }
  .md\:max-w-96 {
        max-width: 36rem;
    }
}
</style>
