<template>
  <div class="w-[100vw] overflow-hidden">
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
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id" class="mt-7"
        ><img
          :src="item.pic"
          alt=""
          class="rounded-[5vw] w-[91.3vw] h-[35.46vw] ml-4"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单部分 -->
    <div class="w-[100%] overflow-hidden scroll-wrapper relative" ref="scroll">
      <ul
        class="w-[200vw] mt-[3.83vw] h-[20vw] scroll-content flex justify-around"
      >
        <li
          v-for="item in menulist"
          :key="item.id"
          class="mr-[4vw] flex items-center flex-wrap justify-around"
        >
          <img :src="item.iconUrl" alt="" class="w-[15vw] h-[15vw] red-image" />
          <p class="text-[12px] text-[#65707f]">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <!-- 推荐歌单 -->
    <div class="w-[100vw] mt-[8.15vw] h-[58.13vw] border-b-2">
      <div class="flex items-center ml-3">
        <p class="text-[6vw] font-bold">推荐歌单</p>
        <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
        <Icon
          icon="solar:menu-dots-bold"
          :rotate="3"
          color="gray"
          width="6vw"
          height="6vw"
          class="ml-[55vw]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from '@better-scroll/core';
import Scrollbar from '@better-scroll/scroll-bar';

BScroll.use(Scrollbar);

export default {
  data() {
    return {
      menu: [],
      banners: [],
      ranking: [],
      menulist: [],
      personalized: [],
      activeMenuItem: '',
    };
  },

  methods: {
    toggleMenu(name) {
      this.activeMenuItem = name;
      this.fetchPlaylists(name);
    },
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
    fetchPlaylists(cat) {
      axios
        .get(
          'https://netease-cloud-music-api-five-roan-88.vercel.app/top/playlist',
          {
            params: {
              cat: cat,
            },
          }
        )
        .then((res) => {
          // console.log( res.data.playlists);
          this.playlists = res.data.playlists;
        });
    },
  },
  mounted() {
    this.init();
  },
  created() {
    axios
      .get(
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/block/page'
      )
      .then((res) => {
        console.log(res);
        this.banners = res.data.data.blocks[0].extInfo.banners;
      })
      .then((cat) => this.fetchPlaylists(cat))
      .catch((err) => {
        console.log(err);
      });

    // 菜单
    axios
      .get(
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/dragon/ball'
      )
      .then((res) => {
        this.menulist = res.data.data;
        // console.log(this.menulist);
      })
      .catch((err) => {
        console.log(err);
      });

    //推荐歌单
    axios
      .get(
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/personalized'
      )
      .then((res) => {
        this.personalized = res.data.result;
        console.log(this.personalized);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.bscroll-indicator {
  width: 20vw !important;
}
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
