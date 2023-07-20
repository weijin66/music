<template>
  <div class="overflow-hidden">
    <!-- 头部标题 -->
    <van-sticky>
      <div class="flex items-center w-[100vw] h-[15vw] bg-[#fff]">
        <Icon
          icon="ph:arrow-left-light"
          color="#343434"
          width="8vw"
          @click.native="$router.push('/home')"
          class="ml-5"
        />
        <p class="text-[#2e2e2e] text-[5vw] ml-[5vw]">MV排行榜</p>
      </div>
    </van-sticky>
    <!-- tab切换 -->
    <van-tabs
      @click="changeTab"
      @change="changeTab"
      swipeable
      sticky
      offset-top="15vw"
    >
      <van-tab :title="item" v-for="item in title" :key="item.id">
        <!-- 更新时间 -->
        <div class="flex items-center w-[91vw] mx-auto mt-[9vw]">
          <p class="text-[5vw] text-[#323232]">
            更新时间:{{ dayjs(MvList.updateTime).format('YYYY年MM月DD日 ') }}
          </p>
          <Icon
            icon="fluent:info-48-regular"
            color="#b3b3b3"
            width="5vw"
            height="5vw"
          />
        </div>
        <!-- MV列表部分 -->
        <ul class="mb-[16vw]">
          <li
            class="w-[91vw] mx-auto mt-[6vw]"
            v-for="(item, index) in MvList"
            :key="item.id"
            @click="showVideo(item.id)"
          >
            <div class="relative">
              <img
                :src="item.cover"
                alt=""
                class="w-[91vw] h-[51vw] rounded-[2vw]"
              />
              <div class="flex items-center absolute top-[1vw] left-[70vw]">
                <Icon
                  icon="ri:play-line"
                  color="white"
                  width="5vw"
                  height="5vw"
                />
                <p class="text-[4vw] text-[#fff]">
                  {{ dataTruncation(item.playCount) }}
                </p>
              </div>
            </div>

            <div class="flex items-center mt-[5vw]">
              <div>
                <p
                  class="text-[7vw] font-bold"
                  :style="`color:${index <= 3 ? '#ff3b37' : '#999'}`"
                >
                  {{ index + 1 }}
                </p>
                <div v-if="item.lastRank === index + 1">
                  <Icon icon="mdi:horizontal-line" />
                </div>
                <div class="flex items-center" v-if="item.lastRank > index + 1">
                  <Icon icon="mdi:triangle" class="text-[2vw] text-[red]" />
                  <div class="text-[2vw]">
                    {{ item.lastRank - (index + 1) }}
                  </div>
                </div>
                <div
                  class="flex items-center"
                  v-if="item.lastRank < index + 1 && item.lastRank != -1"
                >
                  <Icon
                    icon="pepicons-pop:triangle-down-filled"
                    class="text-[3vw] text-[green]"
                  />
                  <div class="text-[2vw]">
                    {{ index + 1 - item.lastRank }}
                  </div>
                </div>
                <div
                  class="text-[1vw] text-green-400"
                  v-if="item.lastRank === -1"
                >
                  NEW
                </div>
              </div>

              <div class="ml-[7vw]">
                <p
                  class="text-[4vw] text-[#333] font-bold line-clamp-1 w-[79vw]"
                >
                  {{ item.name }}
                </p>
                <div class="w-[79vw] line-clamp-1">
                  <span
                    v-for="(item1, index) in item.artists"
                    :key="index"
                    class="text-[2vw] text-[#818181]"
                  >
                    {{ index > 0 ? ' / ' : '' }}{{ item1.name }}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { MvList } from '../../request/index';
export default {
  data() {
    return {
      title: ['内地', '港台', '欧美', '韩国', '日本'], //头部标题
      MvList: [], //数据
      initial: '内地', //默认数据渲染内地
    };
  },
  methods: {
    // 数据播放量判断函数
    dataTruncation(playVolume) {
      if (playVolume > 100000000) {
        return `${Math.floor(playVolume / 100000000)}亿`;
      } else if (playVolume > 100000) {
        return `${Math.floor(playVolume / 10000)}万`;
      } else {
        return playVolume.toString();
      }
    },
    changeTab(name, title) {
      this.initial = title;
      console.log(this.initial);
    },
    showVideo(id) {
      console.log(id);
      this.$router.push({ name: 'playvideo', params: { id } });
    },
  },
  created() {
    MvList(this.initial).then((res) => {
      console.log(res);
      this.MvList = res.data.data;
    });
  },
  watch: {
    initial(value) {
      MvList(value).then((res) => {
        console.log(res);
        this.MvList = res.data.data;
      });
    },
  },
};
</script>

<style></style>
