<template>
  <div class="w-[100%] overflow-hidden scroll-wrapper" ref="scroll">
    <ul
      class="w-[200vw] mt-[3.83vw] h-[20vw] scroll-content flex justify-around ml-2"
    >
      <li
        v-for="item in menulist"
        :key="item.id"
        class="mr-[4vw] flex items-center flex-wrap justify-around"
      >
        <div class="relative">
          <img :src="item.iconUrl" alt="" class="w-[15vw] h-[15vw] red-image" />
          <p
            v-if="item.name == '每日推荐'"
            class="absolute top-[4.5vw] left-[4.5vw] text-[5vw] text-[#fff]"
            :style="{ left: day < 10 ? '6vw' : '4.5vw' }"
          >
            {{ day }}
          </p>
        </div>
        <p class="text-[12px] text-[#65707f]">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
export default {
  name: 'menulist',
  props: ['menulist'],
  data() {
    return {
      day: '',
    };
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        click: true,
        probeType: 1,
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true,
          scrollbarTrackOffsetType: 'clickedPoint', // can use 'step'
        },
      });
    },
    Date() {
      let day = new Date();
      this.day = day.getDate();
      console.log(day);
    },
  },
  mounted() {
    this.init();
  },
  created() {
    this.Date();
  },
};
</script>

<style>
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
