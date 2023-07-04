<template>
  <div class="border-b-[0.1vw] dark:border-[#23252c] h-[75vw]">
    <div class="flex items-center justify-between ml-3 mt-6">
      <div class="flex items-center">
        <p class="text-[5vw] text-[#404959] dark:text-[#fff]" ref="getTitle">
          排行榜
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
      <van-swipe-item v-for="item in blocks" :key="item.id" class="pl-[4vw]">
        <!-- 排行榜 -->
        <div
          class="p-[2vw] mr-[10vw] overflow-hidden w-[90vw] m-[2.5vw] ml-0 h-[60vw] bg-white scroll-item rounded-[3vw] dark:bg-[#25272e]"
        >
          <div class="flex justify-between w-[100%]">
            <div class="flex items-center w-[50vw]">
              <h1 class="text-[5vw] text-[#3d485e] dark:text-[#fff]">
                {{ item.uiElement.mainTitle.title }}
              </h1>
              <Icon
                icon="mingcute:right-line"
                width="6vw"
                height="6vw"
                color="#525d6e"
              />
            </div>
            <p
              class="text-[3vw] leading-[10vw] text-[#939BA1] w-[30vw] pl-[2vw]"
            >
              {{ item.uiElement.mainTitle.titleDesc }}
            </p>
          </div>

          <ul class="">
            <li
              v-for="(items, indexs) in item.resources"
              :key="items.id"
              class="mb-[3vw]"
            >
              <div class="flex relative w-[100%] items-center">
                <img
                  :src="
                    items.resourceExtInfo
                      ? items.resourceExtInfo.songData.album.picUrl
                      : items.uiElement.image.imageUrl
                  "
                  class="w-[13vw] h-[13vw] rounded-[2vw]"
                  alt=""
                />
                <p
                  class="text-[5vw] w-[10vw] text-center"
                  :style="{
                    color: `${
                      indexs == 0
                        ? '#c7972c'
                        : indexs == 1
                        ? '#7982a4'
                        : '#c17443'
                    }`,
                  }"
                >
                  {{ indexs + 1 }}
                </p>
                <div>
                  <p
                    class="text-[4vw] text-[#3b4a5a] dark:text-[#fff] w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {{
                      items.resourceExtInfo
                        ? items.resourceExtInfo.songData.name
                        : items.uiElement.mainTitle.title
                    }}
                  </p>
                  <p class="text-[2.5vw] text-[#81838a]">
                    {{
                      item.resources[indexs].resourceExtInfo?.artists[0].name
                    }}
                    <span
                      class="absolute w-[8vw] h-[5vw] right-[3vw] text-[3vw] top-[1vw]"
                      :style="{
                        color: `${
                          items.uiElement.labelText.text == '新晋'
                            ? 'green'
                            : 'red'
                        }`,
                      }"
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
  methods: {
    clickMe() {
      this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
    },
  },
};
</script>
