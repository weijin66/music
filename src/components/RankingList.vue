<template>
  <div>
    <div class="flex items-center ml-3 mt-6">
      <p class="text-[5vw] font-bold">排行榜</p>
      <div class="ml-[74vw]">
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
      <van-swipe-item v-for="item in blocks" :key="item.id" class="pl-[4vw]">
        <!-- 排行榜 -->
        <div
          class="p-[2vw] mr-[10vw] overflow-hidden w-[90vw] m-[2.5vw] ml-0 h-[50vw] bg-white scroll-item border-b-2 rounded-[3vw]"
          ref="song"
        >
          <div class="flex justify-between w-[100%]">
            <h1 class="text-[5vw] font-semibold w-[25vw] leading-[10vw]">
              {{ item.uiElement.mainTitle.title }}
            </h1>
            <p
              class="text-[3vw] leading-[10vw] text-ellipsis overflow-hidden whitespace-nowrap w-[30vw]"
            >
              {{ item.uiElement.mainTitle.titleDesc }}
            </p>
          </div>
          <ul class="">
            <li v-for="(items, indexs) in 3" :key="indexs.id" class="mb-[3vw]">
              <div class="flex relative w-[100%]">
                <img
                  :src="
                    item.resources[indexs].resourceExtInfo?.songData.album
                      .blurPicUrl
                  "
                  class="w-[10vw] h-[10vw] rounded-[2vw]"
                  alt=""
                />
                <p class="text-[5vw] w-[10vw] text-center">
                  {{ indexs + 1 }}
                </p>
                <div>
                  <p
                    class="text-[3.5vw] font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {{ item.resources[indexs].resourceExtInfo?.songData.name }}
                  </p>
                  <p class="text-[2.5vw]">
                    {{
                      item.resources[indexs].resourceExtInfo?.artists[0].name
                    }}
                    <span
                      class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[1vw]"
                      ref="sps"
                      :style="{ color: 'red' }"
                      >{{
                        item.resources[indexs]?.uiElement.labelText.text
                      }}</span
                    >
                  </p>
                </div>
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
  name: 'rankinglist',
  props: ['blocks'],
  data() {
    return {};
  },
};
</script>
