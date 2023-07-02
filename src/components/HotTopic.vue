<template>
  <div class="border-b-2">
    <div class="flex items-center justify-between ml-3 mt-6">
      <div class="flex items-center">
        <p class="text-[5vw] font-bold" ref="getTitle">热门话题</p>
        <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
      </div>
      <div class="ml-[40vw]">
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
    <div
      class="scroll-wrapper ml-[1vw] w-[89vw] rounded-[2vw] overflow-hidden"
      ref="scroll"
    >
      <ul class="scroll-content flex w-[252vw] m-[2vw] ml-[2vw]">
        <li class="scroll-item rounded-[2vw] w-[60vw] h-[28vw] bg-[#d1b278]">
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]"
              >28万热度</span
            >
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
              </div>
              <img
                src="http://p2.music.126.net/68UCWFRROM30HihOi8LhGQ==/109951167758162478.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li
          class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw] h-[28vw] bg-[#8696dc]"
        >
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]"
              >28万热度</span
            >
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
              </div>
              <img
                src="http://p2.music.126.net/68UCWFRROM30HihOi8LhGQ==/109951167758162478.jpgpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li
          class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw] h-[28vw] bg-[#61e0f1]"
        >
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]"
              >28万热度</span
            >
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
              </div>
              <img
                src="http://p2.music.126.net/68UCWFRROM30HihOi8LhGQ==/109951167758162478.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li
          class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw] h-[28vw] bg-[#f14da5]"
        >
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]"
              >28万热度</span
            >
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
              </div>
              <img
                src="http://p2.music.126.net/68UCWFRROM30HihOi8LhGQ==/109951167758162478.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
export default {
  name: 'hottopic',
  props: ['hottopic'],
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3, // listening scroll event
      });
    },
    clickMe() {
      this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
    },
  },
};
</script>
