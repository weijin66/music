<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.id" class="mt-7"
      ><img
        :src="item.pic"
        alt=""
        class="rounded-[5vw] w-[91.3vw] h-[35.46vw] ml-4"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'swipe',
  props: ['banners'],
  data() {
    return {};
  },
};
</script>

<style></style>
