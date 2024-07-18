<script>
import { ref } from "vue";

export default {
  name: "bodyTrim",
  setup() {
    const showAside = ref(false);
    return { showAside };
  },
};
</script>

<template>
  <div
    id="body-trim"
    class="flex flex-col justify-start items-start flex-wrap content-start md:mt-16 sm:mt-5"
  >
    <div
      id="body-main"
      align="center"
      class="flex md:flex-nowrap flex-wrap justify-center md:space-x-96 md:shrink-0"
    >
      <postsList @posts-loaded="showAside = true" />
      <bodyAside v-if="showAside" />
    </div>
  </div>
</template>

<style>
@media (min-width: 768px) {
  .md\:mt-16 {
    margin-top: 4rem !important;
  }
  .flex-wrap {
    flex-wrap: nowrap;
  }
}
@media (max-width: 640px) {
  .sm\:mt-5 {
    margin-top: 1.25rem !important;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
}
</style>
