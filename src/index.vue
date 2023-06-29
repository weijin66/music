<template>
  <div class="w-[100vw]">
    <div class="relative">
      <Icon
        icon="uiw:left"
        width="6vw"
        height="6vw"
        class="absolute top-0 left-5"
      />
      <h2 class="text-[5vw] text-center font-extrabold mt-6">歌单广场</h2>
    </div>
    <div
      class="w-[80vw] overflow-hidden h-[17.61vw] scroll-wrapper ml-5"
      ref="scroll"
    >
      <ul class="flex w-[130vw] text-[0.3vw] mt-5 relative">
        <li
          v-for="item in menu"
          :key="item.id"
          class="flex items-center text-[3.42vw] font-[800] mx-0 w-[12.8vw] text-center scroll-item"
          :class="{ active: item.name === activeMenuItem }"
          @click="toggleMenu(item.name)"
        >
          <span
            class="w-[12.48vw] block overflow-hidden whitespace-nowrap text-ellipsis"
            >{{ item.name }}</span
          >
        </li>
      </ul>
      <div
        class="w-[12vw] flex items-center justify-center absolute top-[19.5vw] left-[85vw]"
      >
        <Icon icon="ep:menu" color="gray" width="3.68vw" height="3.68vw" />
      </div>
    </div>
    <ul class="flex flex-wrap w-[100vw] mt-2">
      <li
        v-for="item in playlists"
        :key="item.id"
        class="w-[26.15vw] h-[52.29vw] ml-5"
      >
        <div class="relative">
          <img
            :src="item.coverImgUrl"
            class="w-[29.15vw] h-[28.63vw] rounded-[2.5vw]"
            alt=""
          />
          <div
            class="flex items-center w-[20vw] h-[5vw] px-[2.4vw] bg-[#585146] text-[#fff] text-[2.2vw] rounded-[12vw] absolute top-2 right-2"
          >
            <Icon
              icon="basil:play-outline"
              color="white"
              width="3vw"
              height="3vw"
            />
            <span class="absolute right-2">
              {{ parseInt(item.playCount / 10000).toFixed(1) }}万</span
            >
          </div>
        </div>
        <p class="text-[0.3vw]">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from '@better-scroll/core';
export default {
  data() {
    return {
      menu: [],
      playlists: [],
      activeMenuItem: '',
    };
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3, // listening scroll event
      });
    },
    toggleMenu(name) {
      this.activeMenuItem = name;
      this.fetchPlaylists(name);
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
          console.log(res.data.playlists);
          this.playlists = res.data.playlists;
        });
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  created() {
    axios
      .get(
        'https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/hot'
      )
      .then((res) => {
        this.menu = res.data.tags;
        return (this.activeMenuItem = this.menu[0].name);
      })
      .then((cat) => this.fetchPlaylists(cat))
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.active {
  color: red;
}
</style>
