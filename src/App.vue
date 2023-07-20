<template>
  <div class="w-screen">
    <!-- <component :is="currentComponent" /> -->
    <!-- 内置组件 component组件的is属性指向谁就渲染谁 -->
    <!-- 声明式导航 -->
    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <router-link :to="{ path: '/home' }"></router-link>
    <router-view />
    <!-- 播放器 -->
    <Player
      v-if="showPlayer"
      class="fixed bg-[#fff] z-[30]"
      :class="bottonm ? 'bottom-[12vw]' : 'bottom-0'"
    />
    <!-- 底部导航栏 -->
    <NavBar v-if="showNav" class="fixed bottom-0 bg-[#fff] z-[30]" />
  </div>
</template>
<script>
import Player from './components/MusicPlayer/Player.vue';
import NavBar from './components/NavBar/NavBar.vue';
export default {
  components: { Player, NavBar },
  created() {
    console.log(this.$route.path);
  },
  computed: {
    showPlayer() {
      // 在这里根据你的逻辑判断是否在当前页面显示播放器组件
      return (
        this.$route.path !== '/musicplayer' && this.$route.path !== '/playvideo'
      );
    },
    showNav() {
      // 在这里根据你的逻辑判断是否在当前页面显示导航栏组件
      return this.$route.path == '/home';
    },
    bottonm() {
      return this.$route.path == '/home';
    },
  },
};
</script>
<style>
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>
