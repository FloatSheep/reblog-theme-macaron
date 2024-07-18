<script setup>
import { ref, computed } from "vue";

const siteConfig = useAppConfig();

const isDarkMode = ref(false);
const colorIcon = computed(() =>
  isDarkMode.value ? "pi pi-sun" : "pi pi-moon"
);

const toggleColorScheme = () => {
  const element = document.querySelector("html");
  element.classList.toggle("app-dark");
  isDarkMode.value = element.classList.contains("app-dark");
};
</script>

<template>
  <div id="navigation_bar" class="max-w-73ch m-auto items-center gap-5% text-lg p-2em p-x-12">
    <Toolbar class="bg-slate-100/50 backdrop-blur-sm" style="border: none; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <div class="flex items-center gap-2">
          <router-link to="/"><p class="text-lg font-bold">{{ siteConfig.config.siteName }}</p></router-link>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <Button icon="pi pi-search" aria-label="搜索" text />
          <Button
            ref="toggleColorButton"
            :icon="colorIcon"
            aria-label="深/浅色切换"
            @click="() => toggleColorScheme()"
            text
          />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
};
</script>

<style scoped>
#navigation_bar {
  z-index: 100;
  padding: 0 2rem;
}
.p-toolbar {
}
</style>
