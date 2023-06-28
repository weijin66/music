<template>
  <div>
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
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;

export default {
  name: 'musiccalendar',
  props: ['calendar'],
  data() {
    return {};
  },
};
</script>
