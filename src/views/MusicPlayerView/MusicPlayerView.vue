<template>
  <div class="relative h-[100vh]">
    <div class="absolute z-[3]">
      <!--头部-->
      <div
        class="h-[15vw] w-[100vw] flex items-center px-[4vw] justify-between"
      >
        <Icon
          icon="ep:arrow-up-bold"
          class="text-[6vw] mt-[0.6vw] text-[#fff]"
          :rotate="2"
          @click.native="$router.go(-1)"
        />
        <div class="text-center">
          <p class="h-[4vw] text-[4vw] text-[#fff]">
            {{ $player._currentTrack.name }}
          </p>
          <p
            class="text-[2.8vw] text-[#BCBFBF] mt-[2vw] font-[400]"
            v-if="$player._currentTrack.ar && $player._currentTrack.ar[0]"
          >
            {{ $player._currentTrack?.ar[0].name }}
            <span
              class="px-[1.6vw] py-[0.8vw] text-[#d8dBdB] text-[2vw] rounded-[1vw] bg-[#84868B] ml-[1vw]"
              >关注</span
            >
          </p>
        </div>
        <Icon icon="carbon:share" class="text-[6vw] text-[#fff]" />
      </div>

      <div
        class="relative top-[10%] w-[100vw] h-[120vw]"
        v-if="!lyricsSwitching"
      >
        <div
          class="absolute top-[10%] left-[50%] translate-x-[-50%] z-[10] rotated w-[20vw] h-[50vw]"
          :style="
            !$player._playing
              ? `transform:rotate(-45deg)`
              : `transform:rotate(-10deg)`
          "
        >
          <img
            src="../../static/needle-ab.png"
            alt=""
            class="h-[40vw] absolute top-[-3.2vw] left-[-3.2vw]"
          />
        </div>
        <!-- 唱片-->
        <div
          class="w-[80vw] h-[80vw] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-45%]"
        >
          <img src="../../static/circle.png" alt="" class="w-[80vw] h-[80vw]" />
          <img
            :src="$player._currentTrack?.al?.picUrl"
            alt=""
            class="w-[50vw] h-[50vw] absolute top-1/2 left-1/2 rounded-[50%] border-[5px] border-[#000] rotateAnimation1"
            :class="{ 'paused-animation': !this?.$player?._playing }"
            @click="lyricsSwitching = !lyricsSwitching"
          />
        </div>
      </div>
      <!-- 歌词 -->
      <div
        class="w-[100vw] h-[130vw] flex items-center flex-wrap px-[6vw] justify-center overflow-hidden relative internalShadow"
        v-if="lyricsSwitching"
        @click="lyricsSwitching = !lyricsSwitching"
      >
        <div
          class="absolute top-0 transition-all duration-1000"
          :style="{ top: -$player.lineHieght + 'vw' }"
          v-if="lyricsLoadingStatus"
        >
          <div
            v-for="(line, index) in $player.lyricLines"
            :key="index"
            class="p-[4vw] text-[hsla(0,0%,88.2%,.8)] line-clamp-2 w-[100%] flex justify-center text-center"
            :style="{
              color:
                index === $player.lineIndex ? '#fff' : 'hsla(0,0%,88.2%,.7)',
            }"
          >
            {{ line.txt }}
          </div>
        </div>
      </div>
      <div class="fixed bottom-0">
        <!-- 字体图标 -->
        <div class="w-[100vw] flex justify-evenly items-center">
          <div @click="love = !love">
            <Icon
              icon="ant-design:heart-filled"
              v-if="love"
              class="text-[#FE3C3A] text-[6vw]"
            />
            <Icon
              icon="ant-design:heart-outlined"
              class="text-[6vw] text-[#fff]"
              v-else
            />
          </div>
          <Icon
            icon="streamline:interface-download-circle-arrow-circle-down-download-internet-network-server-upload"
            class="text-[5vw] text-[#fff]"
          />
          <Icon
            icon="streamline-emojis:man-singer-2"
            color="red"
            class="text-[6vw]"
          />
          <Icon icon="uil:comment-message" class="text-[6vw] text-[#fff]" />
          <Icon icon="ri:more-2-line" class="text-[6vw] text-[#fff]" />
        </div>
        <!--进度条-->
        <div class="h-[8vw] w-[100vw] flex items-center px-[5vw] mt-[8vw]">
          <div class="text-[#fff] text-[1.6vw] scale-[0.8] opacity-80">
            {{ timeModification($player._progress) }}
          </div>
          <vue-slider
            v-model="$player.progress"
            :duration="0"
            :process="true"
            tooltip="none"
            :drag-on-click="true"
            :min="0"
            :max="$player._duration"
            :interval="0.1"
            class="flex-1 mx-[2.5vw]"
          />
          <div class="text-[#fff] text-[1.6vw] scale-[0.8] opacity-50">
            {{ timeModification($player._duration) }}
          </div>
        </div>
        <!-- 下面播放控件 -->
        <div
          class="h-[12.3vw] flex w-[100vw] items-center justify-evenly mt-[13vw] mb-5"
        >
          <div v-if="false">
            <Icon icon="icon-park-outline:loop-once" v-if="false" />
            <span v-if="false"></span>
          </div>
          <Icon icon="ps:random" v-if="true" class="text-[#fff]" />
          <!--上一曲-->
          <Icon
            icon="fluent:previous-16-filled"
            class="text-[#fff]"
            @click.native="PrevTrackCallback"
          />
          <div
            class="w-[12vw] h-[12vw] rounded-[50%] bg-[#fff] flex items-center justify-center"
          >
            <Icon
              :icon="`${
                $player._playing ? 'carbon:pause-filled' : 'ph:play-fill'
              }`"
              width="20px"
              @click.native="playFn"
            />
          </div>
          <!--下一曲-->
          <Icon
            icon="fluent:next-20-filled"
            class="text-[#fff]"
            @click.native="nextTrackCallback"
          />
          <Icon
            icon="iconamoon:playlist-fill"
            class="text-[6vw] text-[#fff]"
            @click.native="show = !show"
          />
        </div>
      </div>
    </div>

    <!-- 模糊度背景图 -->
    <div
      class="element fixed z-[1] top-0 left-0 right-0 bottom-0"
      :style="`background-image: url(${$player._currentTrack?.al?.picUrl})`"
    ></div>
    <div class="fixed z-[2] bgColor top-0 left-0 right-0 bottom-0"></div>

    <!-- 播放列表 -->
    <van-popup
      class="rounded-t-[20px] px-[5.4vw]"
      v-model="show"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="playmusic py-[6vw]">
        <h1 class="text-[4vw] font-extrabold">
          当前播放
          <span class="text-[2vw] text-[#929293]">({{ music.length }}) </span>
        </h1>
        <div class="flex justify-between mt-[6.6vw] items-center">
          <div class="flex">
            <!-- 列表循环图标 -->
            <Icon
              icon="arcticons:loopboard"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <h1 class="ml-[1.5vw] text-[3.4vw] font-medium">列表循环</h1>
          </div>
          <div class="flex w-[30vw] justify-between">
            <!-- 下载图标 -->
            <Icon
              icon="mi:download"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <!-- 收藏图标 -->
            <Icon
              icon="fluent:collections-20-regular"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
            <!-- 删除 -->
            <Icon
              icon="fluent-mdl2:delete"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div>
        <div
          v-for="(item, index) in music"
          :key="index.id"
          class="flex justify-between items-center h-[14vw]"
          @click="playSingle(item.id)"
        >
          <div class="flex items-center">
            <img
              src="../../static/wave.gif"
              class="red-image w-[2vw] h-[2vw]"
              v-if="item.id === $player._currentTrack.id"
              alt=""
            />
            <h1
              class="text-[4.1vw] ml-[2vw] w-[60vw] line-clamp-1"
              :class="item.id === $player._currentTrack.id ? 'text-[red]' : ''"
            >
              {{ item.name }}
              <span
                :class="
                  item.id === $player._currentTrack?.id ? 'text-[red]' : ''
                "
                class="text-[3vw] text-[#BCBCBC]"
                >-{{ item?.ar[0].name }}</span
              >
            </h1>
          </div>
          <div class="flex items-center">
            <p
              class="text-[3vw] mr-[6vw] text-[#BCBCBC]"
              v-if="item.id === $player._currentTrack.id"
            >
              播放来源
            </p>
            <Icon
              @click.native="fn(index, item.id)"
              icon="ic:baseline-close"
              :horizontalFlip="true"
              class="text-[5vw] text-[#B1B1B1]"
            />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import store from 'storejs';
import { getLyric } from '../../request/index';
import Lyric from 'lyric-parser';
export default {
  data() {
    return {
      love: false,
      show: false,
      music: [],
      ids: [],
      lyricStr: {},
      lyric: {},
      lyricsSwitching: false,
      lyricsLoadingStatus: true,
      id: '',
    };
  },
  created() {
    this.music = store.get('cookie_music');
    this.music.map((item) => {
      // console.log(item.id);
      return this.ids.push(item.id);
    });
    console.log(this.ids);
    console.log(this.$player._currentTrack.id);
    this.id = this.$player._currentTrack.id;
    getLyric(this.id).then((res) => {
      this.lyricStr = res.data.lrc.lyric;
      this.lyric = new Lyric(this.lyricStr);
      console.log(this.lyricStr);
      console.log(this.lyric);
    });
  },
  methods: {
    playFn() {
      this.$player.playOrPause();
    },
    // 时间修改
    timeModification(time) {
      const minutes = Math.floor(time / 60);
      return `${String(minutes).padStart(2, '0')}:${String(
        Math.floor(time % 60)
      ).padStart(2, '0')}`;
    },

    //点击替换
    playSingle(id) {
      this.$player.replacePlaylist(
        this.$player.list.map((data) => data),
        '',
        '',
        id
      );
      store.set('cookie_music', this.$player.list);
    },
    // 上一曲
    PrevTrackCallback() {
      // this.$refs.pointer.style = 'transform:rotate(-45deg)';
      setTimeout(() => {
        this.$player.playOrPause();
        if (this.ids.indexOf(this.$player._currentTrack.id) === 0) {
          this.id = this.ids[this.ids.length - 1];
          // console.log(this.ids.indexOf(this.$player._currentTrack.id));
          this.playSingle(this.ids[this.ids.length - 1]);
          // console.log(this.ids[this.$player.list.length - 1]);
        } else {
          this.id =
            this.ids[this.ids.indexOf(this.$player._currentTrack.id) - 1];
          // console.log(this.$player.list);
          // console.log(this.ids.indexOf(this.$player._currentTrack.id));
          this.playSingle(
            this.ids[this.ids.indexOf(this.$player._currentTrack.id) - 1]
          );
        }
      }, 500);
    },
    // 下一曲
    nextTrackCallback() {
      setTimeout(() => {
        this.$player.playOrPause();
        if (
          this.ids.lastIndexOf(this.$player._currentTrack.id) ==
          this.ids.length - 1
        ) {
          // console.log(this.ids.lastIndexOf(this.$player._currentTrack.id));
          this.id = this.ids[0];
          this.playSingle(this.ids[0]);
        } else {
          this.id =
            this.ids[this.ids.lastIndexOf(this.$player._currentTrack.id) + 1];
          // console.log(this.$player.list);
          // console.log(this.ids.lastIndexOf(this.$player._currentTrack.id));
          this.playSingle(
            this.ids[this.ids.lastIndexOf(this.$player._currentTrack.id) + 1]
          );
        }
      }, 500);
    },
  },
  watch: {
    id(value) {
      this.id = value;
      getLyric(value).then((res) => {
        this.lyricStr = res.data.lrc.lyric;
        this.lyric = new Lyric(this.lyricStr);
      });
    },
  },
};
</script>

<style scoped>
.rotateAnimation1 {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
}
.paused-animation {
  animation-play-state: paused;
}
.element {
  background-size: 100% 100%;
  filter: blur(24px);
}
.bgColor {
  background-color: rgba(0, 0, 0, 0.5);
}
.rotated {
  transition: transform 1s;
  transform-origin: left top;
}
</style>

<style>
.vue-slider-rail {
  background: rgba(255, 255, 255, 0.2);
  height: 0.3vw;
}

.vue-slider-process {
  background: rgba(255, 255, 255, 0.5);
}

.vue-slider-dot {
  height: 1.4vw !important;
  width: 1.4vw !important;
}
</style>
