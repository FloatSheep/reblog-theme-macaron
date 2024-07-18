<script setup>
import { ref } from "vue";

const mainConfig = useAppConfig();
const asideConfig = mainConfig.config.aside;

const circleStyle = ref({});

const updateCircleSize = (event) => {
  const imgWidth = event.target.width;
  const scaleFactor = imgWidth / 48;

  const circleSize = 12 * scaleFactor;

  circleStyle.value = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
  };
};
</script>

<template>
  <div>
    <div class="body-aside max-w-52 w-full">
      <div
        class="body-posts-item item-start bg-indigo-300 max-w-full border border-solid hover:border-black/20 border-indigo-300 rounded-lg p-5 flex flex-col items-start my-2"
      >
        <div class="inline-block relative aside-avatar">
          <img
            :src="asideConfig.avatar"
            class="rounded-full ring-2 ring-white w-auto h-auto"
            @load="updateCircleSize"
          />
          <span
            class="ring-white ring-4 rounded-full block absolute bg-green-400 bottom-0 right-0"
            :style="circleStyle"
          ></span>
        </div>
        <p
          class="text-center mt-4 text-lg text-cyan-950 font-semibold antialiased"
        >
          {{ asideConfig.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bodyAside",
};
</script>

<style scoped>
/* .body-aside {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
} */
.body-posts-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  transition: 0.2s;
}

.aside-avatar {
  width: 100%;
  height: auto;
  position: relative;
}

.aside-avatar span {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
