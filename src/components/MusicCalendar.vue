<template>
  <div>
    <!-- 音乐日历标题 -->
    <div class="flex items-center justify-between ml-3 mt-6">
      <div class="flex items-center">
        <p class="text-[5vw] font-bold" ref="getTitle">音乐日历</p>
        <div
          class="w-[23vw] h-[7vw] rounded-[12vw] bg-[#edf0f2] ml-3 flex items-center dark:bg-gray-400"
        >
          <p>今日{{ calendar.length }}条</p>
          <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
        </div>
      </div>
      <div>
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
    <!-- 音乐日历 -->
    <ul
      class="bg-[#fff] rounded-[2vw] w-[90%] mx-auto mt-6 mb-6 dark:bg-gray-400"
    >
      <li
        class="flex items-center justify-around"
        v-for="item in name"
        :key="item.id"
      >
        <div class="w-[60vw]">
          <div class="flex items-center">
            <p class="p-2">今天 {{ dayjs(onlineTime).format('MM/DD') }}</p>
            <p
              class="rounded-[1vw] text-[red] text-[0.5vw] bg-[#ffece9] ml-5"
              :style="{
                color: `${
                  item.tag == '预告'
                    ? '#5c73a8'
                    : item.tag == '发布'
                    ? 'green'
                    : ''
                }`,
              }"
            >
              {{ item.tag }}
            </p>
          </div>
          <p class="text-[3.9vw] font-bold mt-2 w-[49vw] h-[19vw]">
            {{ item.title }}
          </p>
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
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;

export default {
  name: 'musiccalendar',
  props: ['calendar'],
  data() {
    return {};
  },
  methods: {
    clickMe() {
      this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
    },
  },
  computed: {
    name() {
      return this.calendar.filter((item, index) => index < 2);
    },
  },
};
</script>
