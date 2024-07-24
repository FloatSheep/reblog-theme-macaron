<!-- eslint-disable no-undef -->
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ThemeKit from "@reblog/themekit/dist/esm";

// eslint-disable-next-line no-undef
const siteConfig = useAppConfig();

const isDarkMode = ref(false);
const colorIcon = computed(() =>
  isDarkMode.value ? "pi pi-sun" : "pi pi-moon"
);

const themeKit = new ThemeKit({
  server: {
    url: siteConfig.config.serverConfig.url,
  },
});

const route = useRoute();

const postTitle = ref("");

async function getSlug() {
  if (route.params.slug !== undefined && route.name === "posts-slug") {
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
    console.log(route.name);
  }
);

let lastScrollTop = 0;

const scrollFn = () => {
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navigation_bar");
    const navTitle = document.getElementById("nav-title");
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    if (window.scrollY === 0) {
      navbar.classList.add("bg-transparent");
    } else {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-slate-100/50");
      navbar.classList.add("dark:bg-[#0D1117]/75");
      navbar.classList.add("backdrop-blur-sm");
    }

    if (currentScrollTop < lastScrollTop || currentScrollTop === 0) {
      navbar.classList.remove("scrolling");
      navbar.classList.add("scroll-end");
      navTitle.classList.add("scroll-zero");
    } else {
      navbar.classList.add("scrolling");
      navbar.classList.remove("scroll-end");
      navTitle.classList.remove("scroll-zero");
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
};

const toggleColorScheme = () => {
  if (typeof localStorage !== "undefined" && typeof window !== "undefined") {
    try {
      const element = document.querySelector("html");
      const currentTheme = element.getAttribute("data-theme");
      if (!element) throw new Error("HTML element not found");

      if (isDarkMode.value || currentTheme === "dark") {
        element.classList.remove("app-dark");
        localStorage.removeItem("theme");
        element.setAttribute("data-theme", "light");
      } else {
        element.classList.add("app-dark");
        localStorage.setItem("theme", "dark");
        element.setAttribute("data-theme", "dark");
      }

      isDarkMode.value = !isDarkMode.value;
    } catch (error) {
      console.error("Error toggling color scheme:", error);
    }
  }
};

onMounted(async () => {
  if (typeof window !== "undefined" && !isDarkMode.value) {
    const element = document.querySelector("html");

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDarkMode.value = true;
      localStorage.theme = "dark";
      document.querySelector("html").classList.add("app-dark");
      element.setAttribute("data-theme", "dark");
    }
    if (
      localStorage.theme === "light" &&
      document.querySelector("html").classList.contains("app-dark")
    ) {
      document.querySelector("html").classList.remove("app-dark");
      element.setAttribute("data-theme", "light");
      isDarkMode.value = false;
    }
  }
  await getSlug();
  scrollFn();
});
watch(
  () => route.path,
  async () => {
    await getSlug();
    scrollFn();
  }
);
</script>

<template>
  <div
    id="navigation_bar"
    class="max-w-73ch m-auto items-center gap-5% text-lg p-2em p-x-12 fixed top-0 w-full z-100 dark:text-white"
  >
    <Toolbar
      class="bg-transparent"
      style="border: none; padding: 1rem 1rem 1rem 1.5rem"
    >
      <template #start>
        <div class="flex items-center gap-2">
          <router-link to="/"
            ><p class="text-lg font-bold dark:text-white">
              {{ siteConfig.config.siteName }}
            </p></router-link
          >
        </div>
      </template>

      <template #center>
        <div class="nav-center dark:text-white">
          <div class="nav-menu">
            <router-link to="/friends/"
              ><span
                id="link-btn"
                class="hover:bg-[#425AEF] dark:hover:bg-[#DFAC46] dark:hover:text-black hover:text-white"
              >
                友链
              </span></router-link
            >
          </div>
          <span id="nav-title" class="scroll-zero">{{ postTitle }}</span>
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
  transition: 0.3s;
  z-index: 100;
  padding: 0 2rem;
  transition: background-color 0.3s color 0.1s;
}
.scroll-zero {
  opacity: 0;
  display: none;
}
.scrolling .nav-menu {
  transform: translateY(-50px);
  opacity: 0;
  display: none;
}
.scroll-end .nav-menu {
  transform: translateY(0);
  opacity: 1;
  display: unset;
}
.nav-menu * {
  cursor: pointer;
  padding: 0 0.4rem;
}
#link-btn {
  transition: 0.3s;
  border-radius: 50px;
  letter-spacing: 0.2rem;
  padding: 0.3rem 0.8rem 0.3rem 1rem;
  font-weight: 700;
  height: 35px;
  line-height: 35px;
}
</style>
