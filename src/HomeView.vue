<template>
  <div class="w-[100vw] overflow-hidden bg-purple-100">
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
    <div class="w-[100%] overflow-hidden scroll-wrapper" ref="scroll">
      <ul
        class="w-[200vw] mt-[3.83vw] h-[20vw] scroll-content flex justify-around ml-2"
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
    <div class="w-[100vw] mt-[8.15vw] h-[65.13vw] border-b-2">
      <div class="flex items-center ml-3">
        <p class="text-[5vw] font-bold">推荐歌单</p>
        <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
        <div class="ml-[62vw]">
          <Icon
            icon="solar:menu-dots-bold"
            :rotate="3"
            color="gray"
            width="6vw"
            height="6vw"
          />
        </div>
      </div>
      <div class="w-[100%]" ref="scrolls">
        <ul class="w-[220vw] flex justify-around mt-5">
          <li
            class="w-[32.13vw] h-[43.22vw]"
            v-for="item in personalized"
            :key="item.id"
          >
            <img
              :src="item.picUrl"
              alt=""
              class="w-[32.13vw] h-[32.13vw] rounded-[2vw]"
            />
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新歌新碟\数字专辑 -->
    <div class="w-[100vw] mt-[8.15vw] border-b-2">
      <div class="flex items-center ml-3">
        <p class="text-[5vw] font-bold">新歌新碟\数字专辑</p>
        <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
        <div class="ml-[40vw]">
          <Icon
            icon="solar:menu-dots-bold"
            :rotate="3"
            color="gray"
            width="6vw"
            height="6vw"
          />
        </div>
      </div>
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="item in newAlbum" :key="item.id">
          <div
            class="flex mt-[6.39vw] w-[100%] overflow-hidden scroll-wrapper"
            ref="scroll2"
          >
            <ul class="w-[640vw] ml-6">
              <li
                v-for="items in item.resources"
                :key="items.id"
                class="w-[85.65vw] h-[20.17vw] flex items-center"
              >
                <img
                  :src="items.uiElement.image.imageUrl"
                  alt=""
                  class="w-[16.3vw] h-[16.2vw] rounded-[2vw]"
                />
                <div class="ml-2">
                  <p class="text-[4vw] font-bold">
                    {{ items.uiElement.mainTitle.title }}
                  </p>
                  <p class="text-ellipsis overflow-hidden whitespace-nowrap">
                    {{ items.uiElement.subTitle.title }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 排行榜 -->
    <div class="flex items-center ml-3 mt-6">
      <p class="text-[5vw] font-bold">排行榜</p>
      <div class="ml-[74vw]">
        <Icon
          icon="solar:menu-dots-bold"
          :rotate="3"
          color="gray"
          width="6vw"
          height="6vw"
        />
      </div>
    </div>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="item in blocks" :key="item.id" class="pl-[4vw]">
        <!-- 排行榜 -->
        <div
          class="p-[2vw] mr-[10vw] overflow-hidden w-[90vw] m-[2.5vw] ml-0 h-[50vw] bg-white scroll-item border-b-2 rounded-[3vw]"
          ref="song"
        >
          <div class="flex justify-between w-[100%]">
            <h1 class="text-[5vw] font-semibold w-[25vw] leading-[10vw]">
              {{ item.uiElement.mainTitle.title }}
            </h1>
            <p
              class="text-[3vw] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw]"
            >
              {{ item.uiElement.mainTitle.titleDesc }}
            </p>
          </div>
          <ul class="">
            <li v-for="(items, indexs) in 3" :key="indexs.id" class="mb-[3vw]">
              <div class="flex relative w-[100%]">
                <img
                  :src="
                    item.resources[indexs].resourceExtInfo?.songData.album
                      .blurPicUrl
                  "
                  class="w-[10vw] h-[10vw] rounded-[2vw]"
                  alt=""
                />
                <p class="text-[5vw] w-[10vw] text-center">
                  {{ indexs + 1 }}
                </p>
                <div>
                  <p
                    class="text-[3.5vw] font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {{ item.resources[indexs].resourceExtInfo?.songData.name }}
                  </p>
                  <p class="text-[2.5vw]">
                    {{
                      item.resources[indexs].resourceExtInfo?.artists[0].name
                    }}
                    <span
                      class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[1vw]"
                      ref="sps"
                      :style="{ color: 'red' }"
                      >{{
                        item.resources[indexs]?.uiElement.labelText.text
                      }}</span
                    >
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 音乐日历标题 -->
    <div class="flex items-center ml-3">
      <p class="text-[5vw] font-bold">音乐日历</p>
      <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
      <div class="ml-[62vw]">
        <Icon
          icon="solar:menu-dots-bold"
          :rotate="3"
          color="gray"
          width="6vw"
          height="6vw"
        />
      </div>
    </div>
    <!-- 音乐日历 -->
    <ul class="bg-[#fff] rounded-[2vw] w-[90%] mx-auto mt-6">
      <li
        class="flex items-center justify-around"
        v-for="item in calendar"
        :key="item.id"
      >
        <div class="w-[60vw]">
          <p>{{ dayjs(onlineTime).format('MM/DD') }}</p>
          <p class="text-[5vw] font-bold">{{ item.title }}</p>
        </div>
        <img
          :src="item.imgUrl"
          alt=""
          class="w-[16vw] h-[16vw] rounded-[2vw]"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from '@better-scroll/core';
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;
// import Scrollbar from '@better-scroll/scroll-bar';
// BScroll.use(Scrollbar);

export default {
  data() {
    return {
      menu: [],
      banners: [],
      ranking: [],
      menulist: [],
      personalized: [],
      newAlbum: [],
      blocks: [],
      calendar: [],
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
    this.initTwo();
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
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/personalized?limit=6'
      )
      .then((res) => {
        this.personalized = res.data.result;
        // console.log(this.personalized);
      })
      .catch((err) => {
        console.log(err);
      });

    // 新歌新碟\数字专辑
    axios
      .get(
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/block/page'
      )
      .then((res) => {
        this.newAlbum = res.data.data.blocks[5].creatives;
        // console.log(this.newAlbum);
      })
      .catch((err) => {
        console.log(err);
      });

    // 排行榜
    axios
      .get(
        'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/homepage/block/page'
      )
      .then((res) => {
        // console.log(res.data.data.blocks[3].creatives);
        this.blocks = res.data.data.blocks[3].creatives;
      })
      .catch((err) => {
        console.log(err);
      });

    // 音乐日历
    axios
      .get(
        'https://netease-cloud-music-api-five-roan-88.vercel.app/calendar?startTime=1677417600000&endTime=1677417600000'
      )
      .then((res) => {
        console.log(res.data.data.calendarEvents);
        this.calendar = res.data.data.calendarEvents;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.bscroll-indicator {
  width: 10vw !important;
}
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
