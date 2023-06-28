<template>
  <!-- 搜索框 -->
  <div class="w-[100vw] flex items-center justify-around mt-3 relative">
    <Icon icon="mingcute:menu-fill" width="8vw" hight="8vw" />
    <input
      type="text"
      placeholder="张杰"
      class="w-[72vw] h-[10vw] border-solid border-[0.5vw] rounded-[12vw] border-fuchsia-200 bg-gradient-to-r from-purple-100 to-pink-200 indent-[12vw]"
    />
    <Icon
      icon="circum:search"
      class="absolute top-[2vw] left-[19vw]"
      width="6vw"
      height="6vw"
      color="gray"
    />
    <Icon
      icon="fluent:scan-qr-code-24-filled"
      class="absolute top-[1vw] left-[75vw]"
      width="8vw"
      height="8vw"
      color="gray"
    />
    <Icon
      icon="material-symbols:auto-detect-voice-outline"
      width="8vw"
      hight="8vw"
    />
  </div>
</template>

<script>
export default {
  name: 'searchview',
  data() {
    return {};
  },
};
</script>

<style></style>
