<template>
  <div :class="{ dark: switchCheckStatus }">
    <div
      class="w-[100vw] overflow-hidden bg-[#f7fafc] text-[#000] dark:bg-[#1a1c23] dark:text-[#fff]"
    >
      <!-- 搜索框 -->
      <div class="w-[100vw] flex items-center justify-around mt-3 relative">
        <Icon
          icon="mingcute:menu-fill"
          width="8vw"
          hight="8vw"
          @click.native="shows = !shows"
        />
        <input
          type="text"
          placeholder="张杰"
          class="w-[72vw] h-[10vw] border-solid border-[0.5vw] rounded-[12vw] border-fuchsia-200 bg-gradient-to-r from-purple-100 to-pink-200 indent-[12vw]"
          @click="search"
        />
        <Icon
          icon="circum:search"
          class="absolute top-[2vw] left-[19vw]"
          width="6vw"
          height="6vw"
          color="gray"
        />
        <Icon
          icon="fluent:scan-qr-code-24-filled"
          class="absolute top-[1vw] left-[75vw]"
          width="8vw"
          height="8vw"
          color="gray"
        />
        <Icon
          icon="material-symbols:auto-detect-voice-outline"
          width="8vw"
          hight="8vw"
        />
      </div>
      <van-popup
        v-model="shows"
        position="left"
        :style="{ width: '85%', height: '100%', backgroundColor: '#f5f5f5' }"
      >
        <div class="dark:bg-[#151515]">
          <div
            class="flex items-center justify-between pt-6 ml-[4vw] dark:bg-[#151515]"
          >
            <div class="flex items-center">
              <img
                src="http://p2.music.126.net/uSCBlYEiFPDgBvzmQGUe7A==/109951166096775188.jpg"
                alt=""
                class="w-[8vw] h-[8vw] rounded-[50%]"
              />
              <p class="text-[5vw] ml-3">sophine</p>
              <Icon icon="mingcute:right-line" width="6vw" height="6vw" />
            </div>
            <Icon
              icon="lucide:scan-line"
              width="6vw"
              height="6vw"
              class="mr-3"
            />
          </div>
          <!-- 续费黑胶 -->
          <div
            class="w-[75vw] h-[35vw] rounded-[5vw] bg-[#514645] mx-auto mt-[6vw]"
          >
            <div class="w-[66vw] h-[24vw] mx-auto">
              <div class="w-[66vw] h-[21vw] border-b-[0.1vw] border-[#a08e87]">
                <div
                  class="w-[66vw] h-[7vw] flex items-center justify-between pt-[6vw]"
                >
                  <p class="text-[5vw] font-bold text-[#fee5e0]">续费黑胶VIP</p>
                  <div
                    class="w-[20vw] h-[8vw] border-2 border-[#a5928e] rounded-[12vw] text-center leading-[7vw] text-[#d9c0b7]"
                  >
                    会员中心
                  </div>
                </div>
                <div class="mt-[5vw] text-[#887d77]">立享超21项专属特权 ></div>
              </div>
            </div>
            <div class="ml-3 mt-1">
              <div class="flex">
                <p class="text-[#887d77]">专享优惠! 黑胶VIP仅￥0.1/天!</p>
              </div>
            </div>
          </div>
          <!-- 卡片 -->
          <ul
            v-for="(item, index) in text"
            :key="item.id"
            class="w-[90%] mx-auto bg-[#ffffff] rounded-[3vw] mt-[4vw] dark:bg-[#2c2c2c]"
          >
            <div
              v-if="item.title"
              class="pl-[5vw] pt-[4vw] text-[3vw] border-b-[0.1vw] text-[#aeaeae] dark:border-[#373737] h-[13vw] dark:bg-[#2c2c2c]"
            >
              {{ item.title }}
            </div>
            <li
              v-for="item2 in item.first"
              class="flex items-center py-5 justify-between dark:bg-[#2c2c2c]"
              :key="item2.id"
              :style="{
                borderBottom: `${
                  index != item.first.length - 1 &&
                  index == 0 &&
                  !switchCheckStatus
                    ? '0.1vw solid #f2f2f2'
                    : ''
                }`,
              }"
            >
              <div class="flex items-center ml-4">
                <Icon :icon="item2.icon" class="text-[20px]" />
                <div class="ml-2">{{ item2.msg }}</div>
              </div>
              <div class="flex items-center">
                <div v-if="item2.director" class="text-[#aeaeae] text-[3vw]">
                  {{ item2.director }}
                </div>
                <van-switch
                  :value="switchCheckStatus"
                  @input="(e) => (switchCheckStatus = e)"
                  v-model="checked"
                  active-color="#ee0a24"
                  inactive-color="#dcdee0"
                  size="5vw"
                  v-if="item2.btn"
                  class="mr-3"
                />
                <Icon
                  v-else
                  :icon="item2.icon1"
                  class="text-[25px] mr-2 text-[#e9e9e9]"
                />
              </div>
            </li>
          </ul>
          <div
            class="w-[75vw] h-[14vw] dark:bg-[#2c2c2c] bg-[#fff] rounded-[3vw] mx-auto my-4 text-center leading-[14vw] text-[red]"
            @click="openConfirmDialog"
          >
            退出登录/关闭
          </div>
        </div>
      </van-popup>
      <!-- 轮播图 -->
      <swipe :banners="banners"></swipe>
      <!-- 菜单部分 -->
      <menulist :menulist="menulist"></menulist>
      <!-- 推荐歌单 -->
      <recommendedsonglist
        :personalized="personalized"
        :bannerPic="bannerPic"
        @updateMsg="showTitle"
        :title="show"
      ></recommendedsonglist>
      <!-- 新歌新碟\数字专辑 -->
      <newsongs
        :newAlbum="newAlbum"
        resources="resources"
        @updateMsg="showTitle"
        :title="show"
      ></newsongs>
      <!-- 排行榜 -->
      <rankinglist
        :blocks="blocks"
        @updateMsg="showTitle"
        :title="show"
      ></rankinglist>
      <!-- 热门话题 -->
      <hottopic @updateMsg="showTitle" :title="show"></hottopic>
      <!-- 音乐日历 -->
      <musiccalendar
        :calendar="calendar"
        @updateMsg="showTitle"
        :title="show"
      ></musiccalendar>
      <!-- 从下往上弹出封装的组件 -->
      <drawer :visible.sync="drawerVisible" direction="btt" :test="show">
        <template #header>
          <div
            class="flex justify-between items-center border-b-[0.2vw] dark:border-[#23252c] pt-2 pl-5"
          >
            <p>{{ show }}</p>
            <Icon
              @click.native="closeDrawer"
              icon="carbon:close-filled"
              color="#f1f3f4"
              width="8vw"
              height="8vw"
              class="mr-3"
            />
          </div>
        </template>
        <div class="flex items-center mt-2 ml-3">
          <Icon
            icon="iconamoon:like-bold"
            color="#000"
            width="6vw"
            height="6vw"
          />
          <p class="ml-3">优先推荐</p>
        </div>
        <div class="flex items-center mt-9 ml-3">
          <Icon
            icon="basil:heart-off-outline"
            color="#000"
            width="6vw"
            height="6vw"
          />
          <p class="ml-3">减少推荐</p>
        </div>
        <div class="flex items-center mt-9 ml-3">
          <Icon
            icon="mingcute:more-4-line"
            color="#000"
            width="6vw"
            height="6vw"
          />
          <p class="ml-3">更多内容</p>
          <!-- <p>{{ show }}</p> -->
        </div>
      </drawer>
    </div>
  </div>
</template>

<script>
import { BlockPage, DragonBall, Calendar } from '../../request/index';
import { Dialog } from 'vant';
// import Scrollbar from '@better-scroll/scroll-bar';
// BScroll.use(Scrollbar);

export default {
  data() {
    return {
      menu: [],
      banners: [],
      menulist: [],
      personalized: [],
      newAlbum: [],
      blocks: [],
      calendar: [],
      activeMenuItem: '',
      drawerVisible: false,
      visible: true,
      show: '',
      resourceData: '',
      switchCheckStatus: false,
      checked: false,
      shows: false,
      text: [
        {
          title: '',
          first: [
            {
              icon: 'ic:outline-email',
              msg: '我的消息',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'cib:shell',
              msg: '云贝中心',
              director: '签到',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'ic:outline-lightbulb',
              msg: '创作者中心',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '音乐服务',
          first: [
            {
              icon: 'file-icons:test-react',
              msg: '趣测',
              director: '点击查看今日运势',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ion:ticket-outline',
              msg: '云村有票',
              director: '',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'tabler:brand-pocket',
              msg: '多多西西口袋',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'material-symbols:local-mall-outline-rounded',
              msg: '商城',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'simple-icons:beats',
              msg: 'Beat专区',
              director: '顶级创作邀你创作',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ri:bell-line',
              msg: '口袋彩铃',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:game-three',
              msg: '游戏专区',
              director: '音乐浇灌治愈花园',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '其他',
          first: [
            {
              icon: 'arcticons:set-edit',
              msg: '设置',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'circum:dark',
              msg: '深色模式',
              director: '',
              icon1: 'mingcute:right-line',
              btn: true,
            },

            {
              icon: 'ri:time-line',
              msg: '定时关闭',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:clothes-crew-neck',
              msg: '个性装扮',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ic:twotone-headset',
              msg: '边听边存',
              director: '未开启',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'icon-park-outline:online-meeting',
              msg: '在线听歌免流量',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'arcticons:callsblacklist',
              msg: '音乐黑名单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'el:ok-circle',
              msg: '青少年模式',
              director: '未开启',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'iconoir:clock',
              msg: '音乐闹钟',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
        {
          title: '',
          first: [
            {
              icon: 'icon-park-outline:transaction-order',
              msg: '我的订单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'mdi:coupon-outline',
              msg: '优惠券',
              director: '',
              icon1: 'mingcute:right-line',
            },

            {
              icon: 'mdi:customer-service',
              msg: '我的客服',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'ph:share-fill',
              msg: '分享网易云音乐',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard',
              msg: '个人信息收集与使用清单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '个人信息第三方共享清单',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '个人信息与隐私保护',
              director: '',
              icon1: 'mingcute:right-line',
            },
            {
              icon: 'uiw:information-o',
              msg: '关于',
              director: '',
              icon1: 'mingcute:right-line',
            },
          ],
        },
      ],
    };
  },
  components: {
    swipe: () => import('../../components/Swiper.vue'),
    menulist: () => import('../../components/MenuList.vue'),
    recommendedsonglist: () =>
      import('../../components/RecommendedSongList.vue'),
    newsongs: () => import('../../components/NewSongList.vue'),
    rankinglist: () => import('../../components/RankingList.vue'),
    musiccalendar: () => import('../../components/MusicCalendar.vue'),
    drawer: () => import('../../components/Drawer.vue'),
    hottopic: () => import('../../components/HotTopic.vue'),
  },

  methods: {
    toggleMenu(name) {
      this.activeMenuItem = name;
      this.fetchPlaylists(name);
    },
    showTitle(payload) {
      this.drawerVisible = !this.drawerVisible;
      this.show = payload;
    },
    closeDrawer() {
      // this.$emit('update:visible', false);
      this.drawerVisible = !this.drawerVisible;
    },
    clickHandler(e) {
      if (e.target === this.$refs.drawerMask) {
        // this.visible = false;
        // 使用vm.$emit给父组件传递数据
        this.closeDrawer();
      }
    },
    search() {
      this.$router.push('/search');
    },
    openConfirmDialog() {
      Dialog.confirm({
        message: '确定退出当前账号吗?',
      })
        .then(() => {
          // on confirm
          console.log('Confirmed');
          // 获取 __m__cookie 值
          const mCookie = localStorage.getItem('__m__cookie');

          // 移除 __m__cookie 键
          localStorage.removeItem('__m__cookie');
          this.$router.push('/login');
        })
        .catch(() => {
          // on cancel
          console.log('Cancelled');
        });
    },
  },
  created() {
    // 轮播图  新歌新碟\数字专辑 排行榜
    BlockPage().then((res) => {
      // console.log( this.banners);
      this.banners = res.data.data.blocks[0].extInfo.banners;
      this.newAlbum = res.data.data.blocks[2].creatives; //新歌新碟\数字专辑
      // console.log(this.newAlbum);
      // console.log(res.data.data.blocks[3].creatives);
      this.blocks = res.data.data.blocks[3].creatives; //排行榜
      this.personalized = res.data.data.blocks[1].creatives.slice(1); //推荐歌单
      this.bannerPic = res.data.data.blocks[1].creatives[0].resources; //小轮播数据
      // this.resourceData = this.bannerPic[0].uiElement.mainTitle.title;
      //推荐歌单
      // console.log(this.personalized);
    });

    // 菜单
    DragonBall().then((res) => {
      this.menulist = res.data.data;
      // console.log(this.menulist);
    });

    //推荐歌单
    // Personalized().then((res) => {
    //   this.personalized = res.data.result;
    //   // console.log(this.personalized);
    // });

    // 音乐日历
    Calendar().then((res) => {
      // console.log(res.data.data.calendarEvents);
      this.calendar = res.data.data.calendarEvents;
      // let result = calendar.filter((item, index) => {
      //   return index < 2;
      // });
      // this.calendar = result;
    });
  },
};
</script>

<style>
.bscroll-indicator {
  width: 10vw !important;
}
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
</style>
