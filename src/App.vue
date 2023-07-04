<template>
  <div class="w-screen h-screen">
    <!-- <component :is="currentComponent" /> -->
    <!-- 内置组件 component组件的is属性指向谁就渲染谁 -->
    <!-- 声明式导航 -->
    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <router-link :to="{ path: '/home' }"></router-link>
    <router-view />
  </div>
</template>
<script></script>
<style>
@tailwind base;
@tailwind utilities;
@tailwind components;
</style>
