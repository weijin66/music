<template>
  <div
    class="w-[100vw] mt-[5vw] border-b-[0.1vw] h-[75vw] dark:border-[#23252c]"
  >
    <div class="flex items-center justify-between ml-3">
      <div class="flex items-center">
        <p class="text-[5vw] text-[#404959] dark:text-[#fff]" ref="getTitle">
          新歌新碟\数字专辑
        </p>
        <Icon
          icon="mingcute:right-line"
          width="8vw"
          height="8vw"
          color="#525d6e"
        />
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
    <van-swipe class="my-swipe" :show-indicators="false">
      <van-swipe-item v-for="item in newAlbum" :key="item.id">
        <div
          class="flex mt-[3vw] w-[100%] overflow-hidden scroll-wrapper"
          ref="scroll2"
        >
          <ul class="w-[640vw] ml-6">
            <li
              v-for="items in item.resources"
              :key="items.id"
              class="w-[85.65vw] h-[20.17vw] flex items-center"
            >
              <img
                :src="items.uiElement.image.imageUrl"
                alt=""
                class="w-[16.3vw] h-[16.2vw] rounded-[2vw]"
              />
              <div class="ml-2">
                <p class="text-[4vw] text-[#374258] dark:text-[#fff]">
                  {{ items.uiElement.mainTitle.title }}
                </p>
                <p class="text-[3vw] text-[#616466]">
                  {{ items.uiElement.subTitle.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'newsonglist',
  props: ['newAlbum', 'resources'],
  data() {
    return {};
  },
  methods: {
    clickMe() {
      this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
    },
  },
};
</script>
