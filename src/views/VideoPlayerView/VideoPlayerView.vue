<template>
  <div class="bg-black w-screen h-screen pb-[-12vw] flex flex-wrap absolute">
    <!-- {/* 头部开始 */} -->
    <div
      class="flex justify-between items-center px-[6vw] pt-[3vw] w-[100%] h-[12vw]"
    >
      <Icon
        class="text-[6vw] text-[#fefefe]"
        icon="ep:arrow-up-bold"
        :rotate="3"
        @click.native="
          () => {
            $router.push('/mv');
          }
        "
      />
      <div class="flex items-center">
        <Icon
          icon="fluent:picture-in-picture-enter-24-regular"
          horizontalFlip="{true}"
          class="text-[6vw] text-[#fefefe] mr-[7vw]"
        />
        <Icon
          icon="ri:more-2-fill"
          horizontalFlip="{true}"
          class="text-[6vw] text-[#fefefe]"
        />
      </div>
    </div>
    <!-- {/* 头结束部 */}  -->

    <!-- {/* 视频开始 */} -->
    <div class="w-[100%] h-[54vw] absolute top-[20%]" @click="togglePlayPause">
      <video
        ref="videoPlayer"
        :src="currentPlaybackVideoPath"
        loop
        autoplay
      ></video>
      <Icon
        icon="solar:play-bold"
        v-show="playbackStatus"
        class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[14vw] text-[rgba(255,255,255,0.4)]"
      />
    </div>
    <!-- {/* 视频结束 */}  -->

    <!-- {/* 底部开始 */} -->
    <div class="w-[100%] absolute bottom-[0vw]">
      <div
        class="flex justify-between px-[4vw] items-end pb-[3vw]"
        v-show="!touchTheProgressBar"
      >
        <!-- 作者信息、MV信息、歌曲名称轮播 开始 -->
        <div class="flex-1 mr-[10vw]">
          <!-- {/* 作者信息开始 */} -->
          <div
            class="flex items-center mb-[3vw]"
            v-if="currentPlayingVideoData?.artists"
          >
            <div
              class="relative avatar-container top-[-5vw]"
              :class="displayedArtists.length != 1 ? 'w-[20vw]' : 'w-[10vw]'"
            >
              <img
                v-for="item in displayedArtists"
                :key="item.id"
                :src="item.img1v1Url"
                alt=""
                class="w-[9vw] h-[9vw] rounded-[50%] border-[2px] border-[#ffffff] absolute avatar"
              />
            </div>
            <div
              class="line-clamp-1"
              :class="displayedArtists.length != 1 ? 'w-[48vw]' : ''"
            >
              <span
                class="text-[#ffffff] text-[4vw]"
                v-for="(item1, index) in currentPlayingVideoData.artists"
                :key="index"
              >
                {{ index > 0 ? ' / ' : '' }}{{ item1.name }}</span
              >
            </div>
            <div
              v-if="displayedArtists.length < 2"
              class="bg-[#eb4d44] h-[5vw] w-[7vw] flex items-center justify-center rounded-[2vw]"
            >
              <Icon icon="mingcute:add-fill" class="text-[#fff] text-[4vw]" />
            </div>
          </div>
          <!-- {/* 作者信息结束 */}  -->

          <!-- {/* MV消息开始 */} -->
          <van-collapse v-model="activeNames" class="mb-[5vw]">
            <van-collapse-item name="1">
              <template #title>
                <div>
                  <h1 class="text-[3.2vw]">
                    <span
                      class="w-[7.3vw] mr-[2vw] leading-[5.2vw] text-center inline-block bg-[#333333] text-[#ACACAC]"
                    >
                      MV
                    </span>
                    {{ currentPlayingVideoData?.name }}
                  </h1>
                </div>
              </template>
              {{ currentPlayingVideoData?.desc }}
            </van-collapse-item>
          </van-collapse>
          <!-- {/* MV消息结束 */} -->

          <!-- 歌曲名称轮播开始 -->
          <div class="flex items-center">
            <Icon icon="entypo:note" class="text-[4vw] text-[#b3b3b3]" />
            <van-notice-bar
              scrollable
              :text="currentPlayingVideoData?.name"
              class="w-[34vw]"
              :speed="20"
            />
            <Icon
              icon="ant-design:heart-outlined"
              class="text-[4vw] text-[#b3b3b3]"
            />
          </div>
          <!-- 歌曲名称轮播结束 -->
        </div>
        <!-- 作者信息、MV信息、歌曲名称轮播 结束 -->

        <!-- 点赞、评论、分享、收藏、唱片 开始 -->
        <div class="w-[7vw]">
          <!-- {/* 点赞开始 */} -->
          <div class="flex items-center flex-wrap justify-center mb-[4vw]">
            <Icon class="text-[6vw] mb-[2vw] text-[#eaeaea]" icon="bxs:like" />
            <span class="text-[#eaeaea] text-[3vw]">{{
              dataTruncation(currentVideoInteractionData?.likedCount)
            }}</span>
          </div>
          <!-- {/* 点赞结束 */}  -->

          <!-- {/* 评论开始 */} -->
          <div class="flex items-center flex-wrap justify-center mb-[4vw]">
            <Icon
              class="text-[6vw] mb-[2vw] text-[#eaeaea]"
              icon="uis:comment-dots"
              @click.native="showPopup"
            />
            <span class="text-[#eaeaea] text-[3vw]">{{
              dataTruncation(currentVideoInteractionData?.commentCount)
            }}</span>
          </div>
          <!-- {/* 评论结束 */} -->

          <!-- {/* 分享开始 */} -->
          <div class="flex items-center flex-wrap justify-center mb-[4vw]">
            <Icon
              class="text-[6vw] mb-[2vw] text-[#eaeaea]"
              icon="majesticons:share"
            />
            <span class="text-[#eaeaea] text-[3vw]">{{
              dataTruncation(currentVideoInteractionData?.shareCount)
            }}</span>
          </div>
          <!-- {/* 分享结束 */} -->

          <!-- {/* 收藏开始 */} -->
          <div class="flex items-center flex-wrap justify-center mb-[4vw]">
            <Icon
              class="text-[6vw] mb-[2vw] text-[#eaeaea]"
              icon="fluent:collections-24-filled"
            />
            <span class="text-[#eaeaea] text-[3vw]">收藏</span>
          </div>
          <!-- {/* 收藏结束 */}  -->

          <!-- {/* 旋转唱片开始 */} -->
          <div class="relative flex items-center justify-center">
            <img
              src="../../static/circle.png"
              alt=""
              class="w-[10vw] h-[10vw] rounded-[50%]"
            />
            <img
              :src="currentPlayingVideoData?.cover"
              alt=""
              class="w-[7vw] h-[7vw] rounded-[50%] absolute rotateAnimation"
            />
          </div>
        </div>
        <!-- 点赞、评论、分享、收藏、唱片 结束-->
      </div>
      <!-- 当前播放时间、总时间 开始 -->
      <div
        class="text-[5vw] flex items-center justify-center h-[44vw]"
        v-show="touchTheProgressBar"
      >
        <span class="text-[#ffffff]">{{ currentPlaybackDuration }}</span>
        <span class="text-[#666666]">/{{ currentTotalPlaybackDuration }}</span>
      </div>
      <!-- 当前播放时间、总时间 结束 -->

      <!-- 进度条开始 -->
      <vue-slider
        v-model="progress"
        :process="true"
        tooltip="none"
        :drag-on-click="true"
        :min="0"
        :max="100"
        :interval="0.1"
        :duration="0"
        class="videoProgressBar"
        @dragging="handleProgressChange"
        @drag-end="touchTheProgressBar = false"
      ></vue-slider>
      <!-- 进度条结束 -->

      <!-- 发表评论 开始 -->
      <div
        class="w-[100%] flex items-center justify-between text-[#4d4d4d] px-[4vw] py-[4vw] text-[4vw]"
      >
        发条评论结识有趣的人
        <Icon icon="bx:expand-alt" :rotate="3" class="text-[4vw]" />
      </div>
      <!-- 发表评论 结束 -->
    </div>
    <!-- {/* 底部结束 */} -->
    <!-- 评论弹框 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
      <div>
        <!-- 评论头部开始 -->
        <div class="w-[91vw] mx-auto">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[4vw] text-[#333] font-semibold">评论</span>
              <span class="text-[4vw] text-[#333] font-semibold"
                >({{ addComment }})</span
              >
            </div>
            <ul class="w-[33vw] flex items-center justify-between">
              <li class="text-[4vw] text-[#333] font-semibold">推荐</li>
              <span class="text-[#f5f5f5]">|</span>
              <li class="text-[4vw] text-[#999] font-semibold">最热</li>
              <span class="text-[#f5f5f5]">|</span>
              <li class="text-[4vw] text-[#999] font-semibold">最新</li>
            </ul>
          </div>
        </div>
        <!-- 评论头部结束 -->
        <!-- 评论内容开始 -->
        <ul class="w-[92vw] mx-auto mt-6">
          <li v-for="item in hotComments" :key="item.id" class="mt-[3vw]">
            <div class="flex items-center justify-between">
              <img
                :src="item.user.avatarUrl"
                alt=""
                class="w-[10vw] h-[10vw] rounded-[50%]"
              />
              <div class="flex-1 ml-2">
                <div class="flex items-center">
                  <p class="text-[4vw]">
                    {{ item.user.nickname }}
                  </p>
                  <img
                    :src="item.user?.vipRights?.associator?.iconUrl"
                    alt=""
                    class="w-[9vw] h-[4vw]"
                    v-if="item.user?.vipRights?.associator?.iconUrl"
                  />
                </div>
                <div>
                  <p class="text-[2vw] text-[#999]">
                    {{ item.timeStr }}{{ item.ipLocation.location }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <p class="text-[#999]">{{ item.likedCount }}</p>
                <Icon icon="iconamoon:like-light" color="#999" />
              </div>
            </div>
            <!-- 评论部分 -->
            <div class="ml-[13vw] mb-1 border-[#ccc] border-b-[0.1vw]">
              <p>
                {{ item.content }}
              </p>
              <p class="flex items-center text-[3vw] text-[#4d7eb1]">
                28条回复<Icon
                  icon="mingcute:right-line"
                  color="#4d7eb1"
                  width="3vw"
                />
              </p>
            </div>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  featMvUrl,
  featMvDetail,
  featMvDetailInfo,
  featMvComment,
  featMvCommentFloor,
} from '../../request/index.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export default {
  data() {
    return {
      activeNames: [1],
      currentPlaybackVideoPath: null, //当前播放视频路径
      currentPlayingVideoData: null, // 当前播放视频数据 作者信息等
      currentVideoInteractionData: null, //当前播放视频交互数据
      player: null, // 播放器实例
      progress: 0, // 进度
      playbackStatus: false, // 播放状态
      plyrOptions: {
        // 播放器实例规则
        controls: [],
      },
      currentPlaybackDuration: '00:00', // 当前播放时长
      currentTotalPlaybackDuration: '00:00', // 当前播放总时长
      touchTheProgressBar: false, // 触摸进度条
      show: false, //评论显示隐藏
      addComment: [], //评论数量
      hotComments: [],
    };
  },
  computed: {
    displayedArtists() {
      return this.currentPlayingVideoData.artists.slice(0, 3);
    },
  },
  async created() {
    // 视频
    const res1 = await featMvUrl(this.$route.params.id);
    this.currentPlaybackVideoPath = res1.data.data.url;

    // 作者信息等
    const res2 = await featMvDetail(this.$route.params.id);
    this.currentPlayingVideoData = res2.data.data;
    console.log(this.currentPlayingVideoData);

    // 交互数据
    const res3 = await featMvDetailInfo(this.$route.params.id);
    this.currentVideoInteractionData = res3.data;

    // 评论数据
    const res4 = await featMvComment(this.$route.params.id);
    this.hotComments = res4.data.hotComments;
    this.addComment = res4.data.total;
    console.log(this.hotComments);
  },
  mounted() {
    this.initPlayer();
  },
  beforeDestroy() {},
  methods: {
    // 数据截取
    dataTruncation(playVolume) {
      if (playVolume > 100000000) {
        return `${Math.floor(playVolume / 100000000)}亿`;
      } else if (playVolume > 100000) {
        return `${Math.floor(playVolume / 10000)}万`;
      } else {
        return playVolume?.toString();
      }
    },
    // 初始化视频
    initPlayer() {
      this.player = new Plyr(this.$refs.videoPlayer, this.plyrOptions);

      // 监听 Plyr 播放器的时间更新事件
      this.player.on('timeupdate', this.handleTimeUpdate);
    },
    // 计算进度 获取 当前播放时间于总时长
    handleTimeUpdate(event) {
      // 根据 Plyr 播放器的当前时间更新进度条
      this.progress =
        (event.detail.plyr.currentTime / event.detail.plyr.duration) * 100;

      this.currentPlaybackDuration = this.formatTime(
        event.detail.plyr.currentTime
      ); //当前播放时长
      this.currentTotalPlaybackDuration = this.formatTime(
        event.detail.plyr.duration
      ); //当前播放总时长
    },
    // 点击 拖到进度条视频跳转到对应进度
    handleProgressChange() {
      // 根据进度条的值计算视频的播放时间
      const currentTime = (this.progress / 100) * this.player.duration;

      // 更新 Plyr 播放器的当前时间
      this.player.currentTime = currentTime;

      // 切换为播放状态
      this.player.play();
      this.playbackStatus = false;

      // 显示时间
      this.touchTheProgressBar = true;
      this.currentPlaybackDuration = this.formatTime(currentTime);
    },
    // 切换播放状态
    togglePlayPause() {
      if (this.player.playing) {
        this.player.pause();
        this.playbackStatus = true;
      } else {
        this.player.play();
        this.playbackStatus = false;
      }
    },
    // 将时间格式化为分钟和秒钟的形式（例如：01:30）
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style>
.van-collapse {
  height: 100%;
}

.van-cell {
  background: none;
  padding: 0;
  line-height: normal;
}

.van-cell__title {
  color: #ffffff;
}

.van-hairline--top-bottom::after,
.van-cell::after {
  border: none;
}

.van-cell--clickable:active {
  background-color: #000;
}

.van-collapse-item__content {
  background: none;
  padding: 0;
  color: #ffffff;
  max-height: 97vw;
  overflow: auto;
}

.van-notice-bar {
  background: none !important;
  height: 5vw;
  color: #e8e8e8;
}

.rotateAnimation {
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(100deg);
  }
  to {
    transform: rotate(260deg);
  }
}

.videoProgressBar .vue-slider-rail {
  background: #5f5f5f;
  border-radius: 0;
}

.videoProgressBar .vue-slider-process {
  background: #dfdfdf;
  border-radius: 0;
}

.videoProgressBar .vue-slider-dot,
.videoProgressBar .vue-slider-dot-handle {
  width: 1222vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  z-index: 3;
}

.avatar:nth-child(2) {
  left: 4vw; /* 调整第二个头像的水平偏移量 */
  z-index: 2; /* 设置第二个头像在第一个头像之上 */
}

.avatar:nth-child(3) {
  left: 8vw; /* 调整第三个头像的水平偏移量 */
  z-index: 1; /* 设置第三个头像在第二个头像之上 */
}
</style>
