<template>
  <div class="w-[100vw] mt-[8.15vw] h-[60.13vw] border-b-2">
    <div class="flex items-center justify-between ml-3">
      <div class="flex items-center">
        <p class="text-[5vw] font-bold" ref="getTitle">推荐歌单</p>
        <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
      </div>
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
        <div class="w-[31vw] h-[31vw] mr-[2vw]">
          <div
            class="w-[32.13vw] h-[32.13vw] border-[.0133rem] overflow-hidden relative rounded-[3vw]"
          >
            <div
              class="absolute top-[4%] right-[8%] font-[800] text-[#fff] flex items-center z-30"
            >
              <Icon
                icon="ion:infinite-outline"
                class="text-[#fff] w-[6vw] h-[6vw]"
              />
            </div>
            <transition
              name="abc"
              v-for="(item, index) in bannerPic"
              :key="item.id"
            >
              <div v-if="visible === index" class="absolute top-0 left-0&quot;">
                <img
                  :src="item.uiElement.image.imageUrl"
                  alt=""
                  class="w-[32.13vw] h-[32.13vw] rounded-[2vw]"
                />
              </div>
            </transition>
          </div>
          <p class="text-[3vw] scroll-item line-clamp-2">
            {{ resourceData }}
          </p>
        </div>
        <li
          class="w-[32.13vw] h-[43.22vw] relative"
          v-for="item in personalized"
          :key="item.id"
        >
          <img
            :src="item.uiElement.image.imageUrl"
            alt=""
            class="w-[32.13vw] h-[32.13vw] rounded-[2vw]"
          />
          <p class="text-[3vw] scroll-item line-clamp-2">
            {{ item.uiElement.mainTitle.title }}
          </p>
          <Icon
            icon="ph:play-fill"
            color="#fff"
            class="absolute top-[3vw] left-[13vw]"
          />
          <Icon
            icon="ph:play-fill"
            color="#fff"
            width="6vw"
            height="6vw"
            class="absolute top-[25vw] left-[25vw]"
          />
          <p class="absolute top-[2vw] left-[18vw] text-[#fff]">
            {{
              parseInt(item.resources[0].resourceExtInfo.playCount / 10000)
            }}万
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
  props: ['personalized', 'test', 'bannerPic'],
  data() {
    return {
      visible: 0,
      resourceData: '',
      bannerPic: [],
    };
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
    animateItems() {
      setInterval(() => {
        this.visible++;
        if (this.visible === this.bannerPic.length) {
          this.visible = 0;
        }
        this.resourceData =
          this.bannerPic[this.visible].uiElement.mainTitle.title;
      }, 5000);
    },
  },
  mounted() {
    this.initTwo();
    this.animateItems();
  },
};
</script>
<style scoped>
.abc-enter {
  opacity: 0;
  transform: translateY(100%) scale(0.7);
}
.abc-enter-active {
  transition: all ease-in-out 1s;
}
.abc-enter-to {
  opacity: 1;
  transform: translateY(0%) scale(1);
}

.abc-leave {
  transform: translateY(0) scale(1);
}
.abc-leave-active {
  transition: all ease-in-out 1s;
}
.abc-leave-to {
  transform: translateY(-100%) scale(0.7);
}
</style>
