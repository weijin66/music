<template>
  <div class="w-[100vw] mt-[8.15vw] border-b-2">
    <div class="flex items-center ml-3">
      <p class="text-[5vw] font-bold">新歌新碟\数字专辑</p>
      <Icon icon="mingcute:right-line" width="8vw" height="8vw" />
      <div class="ml-[40vw]">
        <Icon
          icon="solar:menu-dots-bold"
          :rotate="3"
          color="gray"
          width="6vw"
          height="6vw"
        />
      </div>
    </div>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="item in newAlbum" :key="item.id">
        <div
          class="flex mt-[6.39vw] w-[100%] overflow-hidden scroll-wrapper"
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
                <p class="text-[4vw] font-bold">
                  {{ items.uiElement.mainTitle.title }}
                </p>
                <p class="text-ellipsis overflow-hidden whitespace-nowrap">
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
};
</script>
