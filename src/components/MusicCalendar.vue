<template>
  <div>
    <!-- 音乐日历标题 -->
    <div class="flex items-center justify-between ml-3 mt-6">
      <div class="flex items-center">
        <p class="text-[5vw] text-[#404959] dark:text-[#fff]" ref="getTitle">
          音乐日历
        </p>
        <div
          class="w-[24vw] h-[7vw] rounded-[12vw] bg-[#edf0f2] ml-3 flex items-center justify-around dark:bg-[#23252c]"
        >
          <p>今日{{ calendar.length }}条</p>
          <Icon
            icon="mingcute:right-line"
            width="8vw"
            height="8vw"
            color="#525d6e"
          />
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
      class="bg-[#fff] dark:bg-[#272930] rounded-[2vw] w-[90%] mx-auto mt-6 mb-6"
    >
      <li
        class="flex items-center justify-around"
        v-for="item in name"
        :key="item.id"
      >
        <div class="w-[60vw]">
          <div class="flex items-center">
            <p class="p-2 text-[#a6adb0] dark:text-[#585a5f]">
              今天 {{ dayjs(onlineTime).format('MM/DD') }}
            </p>
            <p
              class="rounded-[1vw] text-[red] text-[0.5vw] bg-[#ffece9] dark:bg-[#2d2d39] ml-5"
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
          <p
            class="text-[3.5vw] text-[#414b57] dark:text-[#fff] mt-2 ml-2 w-[49vw] h-[19vw] overflow-hidden overflow-ellipsis whitespace-nowrap"
          >
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
