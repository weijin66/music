<template>
  <div class="w-screen">
    <!-- <component :is="currentComponent" /> -->
    <!-- 内置组件 component组件的is属性指向谁就渲染谁 -->
    <!-- 声明式导航 -->
    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <router-link :to="{ path: '/home' }"></router-link>
    <router-view />
    <!-- 播放器 -->
    <Player v-if="showPlayer" class="fixed bottom-0 bg-[#fff] z-[30]" />
  </div>
</template>
<script>
import Player from './components/MusicPlayer/Player.vue';
export default {
  components: { Player },
  computed: {
    showPlayer() {
      // 在这里根据你的逻辑判断是否在当前页面显示播放器组件
      return this.$route.path !== '/musicplayer';
    },
  },
};
</script>
<style>
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>
