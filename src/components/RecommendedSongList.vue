<template>
  <div class="w-[100vw] mt-[8.15vw] h-[55.13vw] border-b-2">
    <div class="flex items-center ml-3">
      <p class="text-[5vw] font-bold" ref="getTitle">推荐歌单</p>
      <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
      <div class="ml-[62vw]">
        <Icon
          icon="solar:menu-dots-bold"
          :rotate="3"
          color="gray"
          width="6vw"
          height="6vw"
          @click.native="clickMe"
        />
      </div>
    </div>
    <div class="w-[100%]" ref="scrolls">
      <ul class="w-[220vw] flex justify-around mt-5">
        <li
          class="w-[32.13vw] h-[43.22vw] relative"
          v-for="item in personalized"
          :key="item.id"
        >
          <img
            :src="item.picUrl"
            alt=""
            class="w-[32.13vw] h-[32.13vw] rounded-[2vw]"
          />
          <p
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ item.name }}
          </p>
          <Icon
            icon="ph:play-fill"
            color="#fff"
            class="absolute top-[3vw] left-[10vw]"
          />
          <Icon
            icon="ph:play-fill"
            color="#fff"
            width="6vw"
            height="6vw"
            class="absolute top-[25vw] left-[25vw]"
          />
          <p class="absolute top-[2vw] left-[14vw] text-[white]">
            {{ parseInt(item.playCount / 10000) }}万
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
export default {
  name: 'recommendedsonglist',
  props: ['personalized', 'test'],
  data() {
    return {};
  },
  methods: {
    initTwo() {
      this.scrolls = new BScroll(this.$refs.scrolls, {
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
    clickMe() {
      this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
    },
  },
  mounted() {
    this.initTwo();
  },
};
</script>
