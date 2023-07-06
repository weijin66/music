<template>
  <div class="bg-[#91604c] pt-[7vw]">
    <van-sticky>
      <van-button
        style="background-color: #91604c; color: #ffffff; border: none"
        @click.native="$router.push('/home')"
      >
        <!-- 标题 -->
        <div class="mx-auto flex justify-between w-[91.5vw]">
          <div class="flex items-center">
            <Icon
              icon="solar:arrow-left-linear"
              color="#fffeff"
              width="6vw"
              heigt="6vw"
            />
            <!-- <p class="text-[5vw] text-[#fffffa] ml-[5vw]">歌单</p> -->
            <van-notice-bar :text="res.name" />
          </div>
          <div class="flex items-center">
            <Icon icon="gg:search" color="#fffeff" width="5vw" heigt="5vw" />
            <Icon
              icon="solar:menu-dots-bold"
              :rotate="3"
              color="#fffeff"
              width="5vw"
              heigt="5vw"
              class="ml-[5vw]"
            />
          </div>
        </div>
      </van-button>
    </van-sticky>
    <!-- 图片标题 -->
    <div class="w-[91vw] mx-auto">
      <div class="mt-[9vw]">
        <div>
          <!-- 初始显示 -->
          <div class="relative flex" v-if="!visible">
            <img
              :src="res.coverImgUrl"
              alt=""
              class="w-[28vw] h-[28vw] rounded-[2vw] border-t-4 border-[#a07462]"
            />
            <Icon
              icon="ph:play-fill"
              color="#fffeff"
              width="3vw"
              height="3vw"
              class="absolute top-[2vw] left-[12vw]"
            />
            <p class="absolute top-[1vw] left-[15vw] text-[2vw] text-[#fff]">
              {{ parseInt(res.playCount / 10000) }}万
            </p>
            <div class="ml-[3vw]">
              <div>
                <p class="text-[#fffcf8] w-[51vw]">{{ res.name }}</p>
              </div>
              <div class="flex items-center mt-[1vw]">
                <div class="relative" v-if="res.creator.avatarDetail">
                  <img
                    :src="res.creator.avatarUrl"
                    alt=""
                    class="w-[7vw] h-[7vw] rounded-[16vw]"
                  />
                  <img
                    :src="res.creator.avatarDetail.identityIconUrl"
                    alt=""
                    class="absolute top-[4vw] left-[5vw] w-[4vw] h-[4vw] rounded-[16vw]"
                  />
                </div>
                <p class="text-[3vw] text-[#c9ab9c] pl-2">
                  {{ res.creator.nickname }}
                </p>
                <div
                  class="flex items-center w-[13vw] h-[6vw] rounded-[12vw] bg-[#a27662] ml-1"
                >
                  <Icon icon="ic:round-add" color="#fffeff" />
                  <p class="text-[2vw] text-[#f0d9ca]">关注</p>
                </div>
              </div>
              <!-- 歌曲类型 电子 -->
              <div class="flex flex-wrap">
                <div
                  class="text-[3vw] mt-[2vw] flex"
                  v-for="item in res.algTags"
                  :key="item.id"
                >
                  <div
                    class="flex items-center bg-[#ad8370] rounded-[1vw] px-1 ml-2"
                  >
                    <p class="text-[2vw] text-[#fceae1]">{{ item }}</p>
                    <Icon
                      icon="icon-park-outline:right"
                      color="#fffeff"
                      width="3vw"
                      height="3vw"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[6vw] h-[6vw] rounded-[100%] bg-[#9d7865] relative">
              <Icon
                icon="mingcute:down-line"
                color="#fff"
                class="absolute top-[1vw] left-[1vw]"
                @click.native="showtop"
              />
            </div>
          </div>
          <!-- 点击箭头不显示 -->
          <div v-else>
            <div class="w-[91vw] mx-auto">
              <div class="flex items-center justify-between">
                <p class="text-[#d7c0b5]">喜欢这个歌单的用户也听了</p>
                <div
                  class="w-[6vw] h-[6vw] rounded-[100%] bg-[#9d7865] relative"
                >
                  <Icon
                    icon="mingcute:up-line"
                    color="#fff"
                    class="absolute top-[1vw] left-[1vw]"
                    @click.native="showdown"
                  />
                </div>
              </div>
              <!--  -->
              <div class="w-[100%] overflow-auto">
                <ul class="w-[220vw] flex justify-around mt-5 overflow-auto">
                  <li
                    class="w-[32.13vw] h-[43.22vw] relative"
                    v-for="item in personalized"
                    :key="item.id"
                  >
                    <img
                      :src="item.uiElement.image.imageUrl"
                      alt=""
                      class="w-[32.13vw] h-[32.13vw] rounded-[2vw] border-t-4 border-[#eaedef]"
                      @click="songDtail(item.resources[0].resourceId)"
                    />
                    <p class="text-[4vw] scroll-item line-clamp-2 text-[#fff]">
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
                    <p
                      class="absolute top-[2vw] left-[18vw] text-[#fff]"
                      v-if="
                        item.resources[0].resourceExtInfo.playCount >= 10000 &&
                        item.resources[0].resourceExtInfo.playCount < 100000000
                      "
                    >
                      {{
                        parseInt(
                          item.resources[0].resourceExtInfo.playCount / 10000
                        )
                      }}万
                    </p>
                    <p
                      class="absolute top-[2vw] left-[18vw] text-[#fff]"
                      v-if="
                        item.resources[0].resourceExtInfo.playCount >= 100000000
                      "
                    >
                      {{
                        parseInt(
                          item.resources[0].resourceExtInfo.playCount /
                            100000000
                        )
                      }}亿
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 下面文字 -->
        <div class="flex items-center mt-[3vw]">
          <p
            class="overflow-hidden overflow-ellipsis whitespace-nowrap text-[2vw] text-[#b39b94]"
          >
            {{ res.description }}
          </p>
          <Icon
            icon="icon-park-outline:right"
            color="#a4806d"
            width="5vw"
            height="5vw"
          />
        </div>
      </div>
    </div>
    <!-- 分享图标 -->
    <div class="w-[91vw] mx-auto mt-[6vw]">
      <ul class="flex items-center justify-between">
        <li
          class="w-[28vw] h-[11vw] rounded-[12vw] bg-[#b88e7d] flex items-center"
        >
          <div class="flex items-center px-5">
            <Icon
              icon="majesticons:share"
              color="#fffeff"
              width="5vw"
              height="5vw"
            />
            <p class="text-[4vw] text-[#fffcf4] pl-2">
              {{ res.shareCount }}
            </p>
          </div>
        </li>
        <li
          class="w-[28vw] h-[11vw] rounded-[12vw] bg-[#b88e7d] flex items-center"
        >
          <div class="flex items-center px-5">
            <Icon
              icon="iconamoon:comment-dots-fill"
              color="#fffeff"
              width="5vw"
              height="5vw"
            />
            <p class="text-[4vw] text-[#fffcf4] pl-2">{{ res.commentCount }}</p>
          </div>
        </li>
        <li
          class="w-[28vw] h-[11vw] rounded-[12vw] bg-[#ff363f] flex items-center"
        >
          <div class="flex items-center px-5">
            <Icon
              icon="fluent:collections-24-filled"
              color="#fffeff"
              width="5vw"
              height="5vw"
            />
            <p class="text-[4vw] text-[#fffcf4] pl-2">
              {{ res.subscribedCount }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 音乐歌单列表 -->
    <div class="bg-[#fff] mt-[5vw]">
      <div
        class="w-[89vw] mx-auto flex justify-between pt-[5vw] rounded-t-lg sticky top-[8vw] bg-[#fff]"
      >
        <div class="flex items-center">
          <Icon
            icon="carbon:play-filled"
            color="#fc3630"
            width="6vw"
            height="6vw"
          />
          <p class="pl-[5vw] text-[4vw] text-[#353435] font-bold">播放全部</p>
          <p class="text-[#928e88] pl-[3vw]">({{ res.trackCount }})</p>
        </div>
        <div class="flex items-center">
          <Icon icon="fe:download" width="6vw" height="6vw" />
          <Icon
            icon="mingcute:menu-fill"
            width="6vw"
            height="6vw"
            class="ml-[5vw]"
          />
        </div>
      </div>
      <!-- 歌曲部分 -->
      <div class="w-[89vw] mx-auto">
        <ul>
          <li
            v-for="(item, index) in res1"
            :key="item.id"
            class="flex items-center justify-between my-[5vw]"
          >
            <div>
              <span class="text-[5vw] text-[#969696]">{{ index + 1 }}</span>
            </div>
            <div class="ml-[4vw] flex-1">
              <div class="flex items-center">
                <span
                  class="text-[4vw] text-[#323131] block w-[25vw] overflow-hidden text-ellipsis whitespace-nowrap"
                  >{{ item.name }}</span
                >
                <span
                  v-if="item && item.tns"
                  class="text-[4vw] text-[#a0a0a0] w-[30vw] overflow-hidden text-ellipsis whitespace-nowrap"
                  >({{ item.tns[0] }})</span
                >
                <span
                  v-if="item && !item.tns && item.alia[0]"
                  class="text-[4vw] text-[#a0a0a0] w-[30vw] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  ({{ item.alia[0] }})
                </span>
              </div>
              <div class="flex items-center">
                <p
                  class="text-[3vw] text-[#7e7e7e] w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {{ item.ar[0].name }} - {{ item.al.name }}
                </p>
              </div>
            </div>
            <div class="flex items-center">
              <Icon
                icon="arcticons:fpt-play"
                color="#b2b2b2"
                class="mr-[7vw]"
                width="6vw"
                height="6vw"
              />
              <Icon
                icon="charm:menu-kebab"
                color="#b2b2b2"
                width="6vw"
                height="6vw"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { songDetail, songAll } from '../../request/index.js';
import axios from 'axios';
export default {
  data() {
    return {
      res: {},
      res1: [],
      visible: false,
      personalized: [],
    };
  },
  methods: {
    showtop() {
      console.log(111);
      this.visible = !this.visible;
    },
    showdown() {
      console.log(111);
      this.visible = !this.visible;
    },
  },
  async created() {
    console.log(this.$route);
    songDetail(this.$route.query.id).then((res) => {
      console.log(res);
      this.res = res.data.playlist;
    });

    console.log(this.$route);
    songAll(this.$route.query.id).then((res) => {
      this.res1 = res.data.songs;
      console.log(this.res1);
    });
    axios
      .get(
        'https://netease-cloud-music-api-five-roan-88.vercel.app/homepage/block/page'
      )
      .then((res) => {
        this.personalized = res.data.data.blocks[1].creatives.slice(1);
        console.log(this.personalized);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.van-notice-bar__wrap {
  width: 39vw;
}
.van-notice-bar {
  background-color: #91604c !important;
  color: #fff !important;
  font-size: 5vw !important;
}
</style>
