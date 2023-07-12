<template>
  <div>
    <!-- 头部标题 -->
    <div class="flex items-center mt-[7vw] ml-[5vw]">
      <Icon icon="ph:arrow-left-light" color="#343434" width="8vw" />
      <p class="text-[#2e2e2e] text-[5vw] ml-[5vw]">MV排行榜</p>
    </div>
    <!-- tab切换 -->
    <van-tabs class="mt-[8vw]" @click="changeTab">
      <van-tab :title="item" v-for="item in title" :key="item.id"></van-tab>
    </van-tabs>
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
    <ul>
      <li
        class="w-[91vw] mx-auto mt-[6vw]"
        v-for="(item, index) in MvList"
        :key="item.id"
      >
        <div class="relative">
          <img
            :src="item.cover"
            alt=""
            class="w-[91vw] h-[51vw] rounded-[2vw]"
          />
          <div class="flex items-center absolute top-[1vw] left-[70vw]">
            <Icon icon="ri:play-line" color="white" width="5vw" height="5vw" />
            <p class="text-[4vw] text-[#fff]">
              {{ dataTruncation(item.playCount) }}
            </p>
          </div>
        </div>

        <div class="flex items-center mt-[5vw]">
          <p
            class="text-[7vw] font-bold"
            :style="`color:${index <= 3 ? '#ff3b37' : '#999'}`"
          >
            {{ index + 1 }}
          </p>
          <div class="ml-[7vw]">
            <p class="text-[4vw] text-[#333] font-bold line-clamp-1 w-[79vw]">
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
